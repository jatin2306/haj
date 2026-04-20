import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  DatePicker,
  Drawer,
  Input,
  InputNumber,
  Modal,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
  message,
} from 'antd';
import dayjs from 'dayjs';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {
  buildBlogUpsertFormData,
  fetchAdminBlogById,
  fetchAdminBlogsList,
  postBlogMultipart,
} from '../api/blogsAdminApi';
import { getBlogPostId, getCardImage } from '../utils/blogContent';
import './adminBlogs.css';

const { Title, Text } = Typography;

function revokeBlobUrl(url) {
  if (typeof url === 'string' && url.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(url);
    } catch {
      /* ignore */
    }
  }
}

const initialGallerySlot = () => ({ file: null, image_url: '', display_order: 0 });

export default function AdminBlogsPage() {
  const [rows, setRows] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loadOneLoading, setLoadOneLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('Away to Makkah');
  const [readTimeMinutes, setReadTimeMinutes] = useState(5);
  const [publishedAt, setPublishedAt] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [coverPhoto, setCoverPhoto] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [galleryPhotos, setGalleryPhotos] = useState([initialGallerySlot()]);
  const [errors, setErrors] = useState({});

  const coverInputRef = useRef(null);
  const galleryInputRefs = useRef({});
  const multiFileInputRef = useRef(null);

  const loadList = useCallback(async () => {
    setListLoading(true);
    try {
      const list = await fetchAdminBlogsList();
      setRows(list);
    } catch (e) {
      message.error(e?.message || 'Failed to load blogs');
      setRows([]);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    loadList();
  }, [loadList]);

  const resetForm = () => {
    revokeBlobUrl(coverPhoto);
    galleryPhotos.forEach((p) => revokeBlobUrl(p?.image_url));
    setHeading('');
    setDescription('');
    setCategory('');
    setAuthor('Away to Makkah');
    setReadTimeMinutes(5);
    setPublishedAt(null);
    setIsActive(true);
    setCoverPhoto('');
    setCoverFile(null);
    setGalleryPhotos([initialGallerySlot()]);
    setErrors({});
    setEditId(null);
    if (coverInputRef.current) coverInputRef.current.value = '';
  };

  const openCreate = () => {
    resetForm();
    setLoadOneLoading(false);
    setDrawerOpen(true);
  };

  const fillFormFromBlog = (blog) => {
    const coverUrl =
      blog.cover_photo ||
      (Array.isArray(blog.blog_photos)
        ? blog.blog_photos.find((p) => p?.image_type === 'cover')?.image_url ||
          blog.blog_photos[0]?.image_url
        : '') ||
      '';
    const gallery =
      Array.isArray(blog.blog_photos) && blog.blog_photos.length > 0
        ? blog.blog_photos
            .filter((p) => (p?.image_type || 'gallery') === 'gallery')
            .map((p) => ({
              file: null,
              image_url: p?.image_url ?? '',
              display_order: p?.display_order ?? 0,
            }))
        : [initialGallerySlot()];
    setHeading(blog.heading ?? '');
    setDescription(blog.description ?? '');
    setCategory(blog.category ?? '');
    setAuthor(blog.author || 'Away to Makkah');
    setReadTimeMinutes(blog.read_time_minutes != null ? Number(blog.read_time_minutes) : 5);
    setPublishedAt(blog.published_at ? dayjs(blog.published_at) : null);
    setIsActive(blog.is_active !== false);
    setCoverPhoto(coverUrl);
    setCoverFile(null);
    setGalleryPhotos(gallery.length ? gallery : [initialGallerySlot()]);
    setErrors({});
  };

  const openEdit = async (id) => {
    setDrawerOpen(true);
    setEditId(id);
    setLoadOneLoading(true);
    try {
      const blog = await fetchAdminBlogById(id);
      if (!blog) {
        message.error('Blog not found');
        setDrawerOpen(false);
        return;
      }
      fillFormFromBlog(blog);
    } catch (e) {
      message.error(e?.message || 'Failed to load blog');
      setDrawerOpen(false);
    } finally {
      setLoadOneLoading(false);
    }
  };

  const closeDrawer = () => {
    revokeBlobUrl(coverPhoto);
    galleryPhotos.forEach((p) => revokeBlobUrl(p?.image_url));
    setDrawerOpen(false);
    setEditId(null);
    setLoadOneLoading(false);
    if (coverInputRef.current) coverInputRef.current.value = '';
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    revokeBlobUrl(coverPhoto);
    setCoverFile(file);
    setCoverPhoto(URL.createObjectURL(file));
  };

  const removeCover = () => {
    revokeBlobUrl(coverPhoto);
    setCoverPhoto('');
    setCoverFile(null);
    if (coverInputRef.current) coverInputRef.current.value = '';
  };

  const setPhoto = (index, updates) => {
    setGalleryPhotos((prev) =>
      prev.map((photo, i) => (i === index ? { ...photo, ...updates } : photo)),
    );
  };

  const handleGalleryChange = (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGalleryPhotos((prev) => {
      const photo = prev[index];
      revokeBlobUrl(photo?.image_url);
      return prev.map((ph, i) =>
        i === index ? { ...ph, file, image_url: URL.createObjectURL(file) } : ph,
      );
    });
  };

  const addPhoto = () => {
    setGalleryPhotos((prev) => {
      const nextOrder =
        prev.length === 0 ? 0 : Math.max(...prev.map((p) => p.display_order), -1) + 1;
      return [...prev, { ...initialGallerySlot(), display_order: nextOrder }];
    });
  };

  const removePhoto = (index) => {
    if (galleryPhotos.length <= 1) return;
    const photo = galleryPhotos[index];
    revokeBlobUrl(photo?.image_url);
    setGalleryPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMultiSelect = (e) => {
    const files = e.target.files;
    if (!files?.length) return;
    let nextOrder =
      galleryPhotos.length === 0
        ? 0
        : Math.max(...galleryPhotos.map((p) => p.display_order), -1) + 1;
    const newPhotos = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      if (!file?.type?.startsWith('image/')) continue;
      newPhotos.push({
        file,
        image_url: URL.createObjectURL(file),
        display_order: nextOrder++,
      });
    }
    setGalleryPhotos((prev) => [...prev, ...newPhotos]);
    e.target.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = {};
    if (!heading.trim()) e2.heading = 'Heading is required';
    if (!category.trim()) e2.category = 'Category is required';
    if (!description.replace(/<[^>]*>/g, '').trim()) e2.description = 'Description is required';
    if (!coverFile && !coverPhoto?.trim()) e2.cover_photo = 'Cover photo is required';
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;

    const blog_photos = [
      { image: coverFile || coverPhoto, type: 'cover' },
      ...galleryPhotos
        .filter((p) => p.file || p.image_url)
        .map((p) => ({
          image: p.file || p.image_url,
          type: 'gallery',
          display_order: p.display_order ?? 0,
        })),
    ];

    const payload = {
      id: editId ?? undefined,
      heading: heading.trim(),
      description: description.trim(),
      category: category.trim(),
      author: author?.trim() || 'Away to Makkah',
      read_time_minutes: Math.max(1, parseInt(readTimeMinutes, 10) || 5),
      is_active: isActive,
      published_at: publishedAt ? publishedAt.toISOString() : undefined,
      clear_published_at: Boolean(editId && !publishedAt),
      blog_photos,
    };

    setSaving(true);
    try {
      const fd = buildBlogUpsertFormData(payload);
      await postBlogMultipart(fd);
      message.success(editId ? 'Blog updated' : 'Blog created');
      closeDrawer();
      resetForm();
      await loadList();
    } catch (err) {
      message.error(err?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (row) => {
    const id = getBlogPostId(row);
    if (id == null) return;
    Modal.confirm({
      title: 'Delete this blog post?',
      content: row?.heading || `ID ${id}`,
      okText: 'Delete',
      okButtonProps: { danger: true },
      onOk: () =>
        (async () => {
          const fd = buildBlogUpsertFormData({ id, is_deleted: true });
          await postBlogMultipart(fd);
          message.success('Deleted');
          await loadList();
        })().catch((err) => {
          message.error(err?.message || 'Delete failed');
        }),
    });
  };

  const columns = [
    {
      title: 'Cover',
      key: 'cover',
      width: 88,
      render: (_, row) => {
        const url = getCardImage(row);
        return url ? (
          <img src={url} alt="" style={{ width: 64, height: 40, objectFit: 'cover', borderRadius: 6 }} />
        ) : (
          '—'
        );
      },
    },
    {
      title: 'ID',
      key: 'id',
      width: 64,
      render: (_, row) => getBlogPostId(row) ?? '—',
    },
    { title: 'Heading', dataIndex: 'heading', ellipsis: true },
    { title: 'Category', dataIndex: 'category', width: 120, ellipsis: true },
    {
      title: 'Active',
      dataIndex: 'is_active',
      width: 88,
      render: (v) => (v ? <Tag color="green">Yes</Tag> : <Tag>No</Tag>),
    },
    {
      title: 'Published',
      dataIndex: 'published_at',
      width: 120,
      render: (d) => (d ? dayjs(d).format('D MMM YYYY') : '—'),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 280,
      render: (_, row) => {
        const rowId = getBlogPostId(row);
        return (
          <Space size="small" wrap>
            <Button type="link" size="small" disabled={rowId == null} onClick={() => openEdit(rowId)}>
              Edit
            </Button>
            {rowId != null ? (
              <Link to={`/blog/${rowId}`} style={{ fontSize: 14 }}>
                View
              </Link>
            ) : (
              <Text type="secondary">View</Text>
            )}
            <Button type="link" size="small" danger onClick={() => confirmDelete(row)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="admin-blogs-page" style={{ maxWidth: 1100 }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              Blog posts
            </Title>
            <Text type="secondary">Create and edit posts shown on the public site (API).</Text>
          </div>
          <Button type="primary" onClick={openCreate}>
            Add blog
          </Button>
        </div>

        <Table
          rowKey={(row) => String(getBlogPostId(row) ?? `row-${row.heading ?? ''}`)}
          loading={listLoading}
          columns={columns}
          dataSource={rows}
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: 'No blog posts yet. Click Add blog to create one.' }}
        />
      </Space>

      <Drawer
        title={editId ? `Edit blog #${editId}` : 'Add blog'}
        width={720}
        open={drawerOpen}
        onClose={closeDrawer}
        destroyOnClose
        styles={{ body: { paddingBottom: 24 } }}
      >
        {loadOneLoading ? (
          <Text type="secondary">Loading…</Text>
        ) : (
          <form onSubmit={handleSubmit}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text strong>Heading *</Text>
                <Input
                  value={heading}
                  onChange={(e) => {
                    setHeading(e.target.value);
                    if (errors.heading) setErrors((x) => ({ ...x, heading: '' }));
                  }}
                  placeholder="e.g. Umrah planning tips"
                  status={errors.heading ? 'error' : undefined}
                  style={{ marginTop: 6 }}
                />
                {errors.heading ? <Text type="danger">{errors.heading}</Text> : null}
              </div>

              <div>
                <Text strong>Cover photo *</Text>
                <div className="admin-image-upload-box admin-cover-upload-box" style={{ marginTop: 6 }}>
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    className="admin-image-upload-input"
                    onChange={handleCoverChange}
                    aria-label="Cover photo"
                  />
                  {coverPhoto || coverFile ? (
                    <div className="admin-image-preview-wrap">
                      <img src={coverPhoto} alt="" className="admin-image-preview" />
                      <span className="admin-image-preview-label">Cover</span>
                      <button
                        type="button"
                        className="admin-image-preview-remove"
                        onClick={removeCover}
                        disabled={saving}
                        aria-label="Remove cover"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="admin-image-upload-placeholder"
                      onClick={() => coverInputRef.current?.click()}
                    >
                      + Add cover image
                    </button>
                  )}
                </div>
                {errors.cover_photo ? <Text type="danger">{errors.cover_photo}</Text> : null}
              </div>

              <div>
                <Text strong>Category *</Text>
                <Input
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (errors.category) setErrors((x) => ({ ...x, category: '' }));
                  }}
                  placeholder="e.g. Travel tips"
                  status={errors.category ? 'error' : undefined}
                  style={{ marginTop: 6 }}
                />
                {errors.category ? <Text type="danger">{errors.category}</Text> : null}
              </div>

              <div>
                <Text strong>Author</Text>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Away to Makkah"
                  style={{ marginTop: 6 }}
                />
              </div>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <Text strong>Read time (minutes)</Text>
                  <InputNumber min={1} value={readTimeMinutes} onChange={(v) => setReadTimeMinutes(v ?? 5)} style={{ marginTop: 6, display: 'block', width: 160 }} />
                </div>
                <div>
                  <Text strong>Publish date</Text>
                  <DatePicker
                    value={publishedAt}
                    onChange={(v) => setPublishedAt(v)}
                    allowClear
                    style={{ marginTop: 6, display: 'block', width: '100%', minWidth: 220 }}
                  />
                </div>
                <div style={{ alignSelf: 'flex-end' }}>
                  <Text strong>Visible on site</Text>
                  <div style={{ marginTop: 6 }}>
                    <Switch checked={isActive} onChange={setIsActive} />
                  </div>
                </div>
              </div>

              <div>
                <Text strong>Description * (HTML)</Text>
                <div
                  className={`admin-html-editor-wrap${errors.description ? ' admin-form-input-error' : ''}`}
                  style={{ marginTop: 6 }}
                >
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={(v) => {
                      setDescription(v);
                      if (errors.description) setErrors((x) => ({ ...x, description: '' }));
                    }}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link'],
                        ['clean'],
                      ],
                    }}
                  />
                </div>
                {errors.description ? <Text type="danger">{errors.description}</Text> : null}
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                  <Text strong>Gallery images</Text>
                  <Space>
                    <input
                      ref={multiFileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="admin-multi-file-input"
                      onChange={handleMultiSelect}
                      aria-label="Select multiple images"
                    />
                    <Button size="small" onClick={() => multiFileInputRef.current?.click()}>
                      Select multiple
                    </Button>
                    <Button size="small" type="primary" ghost onClick={addPhoto}>
                      + Add slot
                    </Button>
                  </Space>
                </div>
                <div className="admin-real-wedding-photos-grid" style={{ marginTop: 10 }}>
                  {galleryPhotos.map((photo, index) => (
                    <div key={index} className="admin-real-wedding-photo-card">
                      <div className="admin-image-upload-box admin-image-upload-box-grid">
                        <input
                          ref={(el) => {
                            galleryInputRefs.current[index] = el;
                          }}
                          type="file"
                          accept="image/*"
                          className="admin-image-upload-input"
                          onChange={(ev) => handleGalleryChange(index, ev)}
                          aria-label={`Gallery ${index + 1}`}
                        />
                        {photo.image_url ? (
                          <div className="admin-image-preview-wrap">
                            <img src={photo.image_url} alt="" className="admin-image-preview" />
                            <span className="admin-image-preview-label">{index + 1}</span>
                            <button
                              type="button"
                              className="admin-image-preview-remove"
                              onClick={() => {
                                revokeBlobUrl(photo.image_url);
                                setPhoto(index, { file: null, image_url: '' });
                              }}
                              disabled={saving}
                              aria-label="Remove"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="admin-image-upload-placeholder"
                            onClick={() => galleryInputRefs.current[index]?.click()}
                          >
                            + Upload
                          </button>
                        )}
                      </div>
                      <div className="admin-real-wedding-photo-card-footer">
                        <label style={{ fontSize: 12, color: '#64748b' }}>
                          Order{' '}
                          <input
                            type="number"
                            min={0}
                            className="admin-form-input-order"
                            value={photo.display_order}
                            onChange={(ev) =>
                              setPhoto(index, { display_order: parseInt(ev.target.value, 10) || 0 })
                            }
                          />
                        </label>
                        <Button
                          size="small"
                          danger
                          type="text"
                          disabled={galleryPhotos.length <= 1}
                          onClick={() => removePhoto(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Space style={{ marginTop: 8 }}>
                <Button onClick={closeDrawer} disabled={saving}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" loading={saving}>
                  {editId ? 'Update blog' : 'Create blog'}
                </Button>
              </Space>
            </Space>
          </form>
        )}
      </Drawer>
    </div>
  );
}
