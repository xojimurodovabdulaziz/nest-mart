import "./PageLoader.css";

/**
 * Shown briefly while a lazily-loaded route chunk downloads. Kept
 * intentionally minimal (no header/footer skeleton) since on a fast
 * connection this is only visible for a frame or two.
 */
const PageLoader = () => (
  <div className="page-loader" role="status" aria-live="polite">
    <span className="page-loader-spinner" aria-hidden="true" />
    <span className="page-loader-text">Yuklanmoqda…</span>
  </div>
);

export default PageLoader;
