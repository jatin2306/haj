export function scrollToTop({ behavior = 'smooth' } = {}) {
  window.scrollTo({ top: 0, left: 0, behavior });
  if (behavior !== 'smooth') {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}
