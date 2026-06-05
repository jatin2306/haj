import SEO, { hajjPackage2027ProductSchema, pageSchemas } from '../components/SEO';

export default function HajjPackage2027Page() {
  const title = 'Hajj Package 2027 — 5-Star & Deluxe from UK';
  const description =
    'Book your Hajj 1448/2027 package. 5-Star Shifting from £8,449, Deluxe Non-Shifting from £6,549 per person. Bangladeshi passport required. Register by Oct 2026.';

  return (
    <main id="content" className="hajjPage">
      <SEO
        title={title}
        description={description}
        path="/hajj-package-2027"
        schema={[
          ...pageSchemas({
            path: '/hajj-package-2027',
            name: title,
            description,
            breadcrumbs: [
              { name: 'Home', url: '/' },
              { name: 'Hajj Package 2027', url: '/hajj-package-2027' },
            ],
          }),
          hajjPackage2027ProductSchema(),
        ]}
      />