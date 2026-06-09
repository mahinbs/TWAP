import { Navigate, useParams } from 'react-router-dom';

const REDIRECTS: Record<string, string> = {
  '/showcase': '/promote',
  '/products': '/directory',
  '/best-project-management-software': '/directory',
};

export function StaticRedirect({ from }: { from: string }) {
  const to = REDIRECTS[from] ?? '/';
  return <Navigate to={to} replace />;
}

/** /product-review/:slug → /products/:slug */
export function ProductReviewRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={slug ? `/products/${slug}` : '/directory'} replace />;
}
