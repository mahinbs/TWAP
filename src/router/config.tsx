import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import HomePage from '../pages/home/page';
import NotFound from '../pages/NotFound';
import { StaticRedirect, ProductReviewRedirect } from '../components/routing/LegacyRedirect';
import DirectoryPage from '../pages/directory/page';
import ServicesPage from '../pages/services/page';
import TopProductsPage from '../pages/top-products/page';
import ResourceCentrePage from '../pages/resource-centre/page';
import AgenciesPage from '../pages/agencies/page';
import EverythingAIPage from '../pages/everything-ai/page';
import SuccessStoriesPage from '../pages/interviews-success-stories/page';
import PromotePage from '../pages/promote/page';
import PromoteCategoryPage from '../pages/promote/category-page';
import MethodologyPage from '../pages/methodology/Methodology.tsx/page';
import ProductDetailPage from '../pages/product-detail/page';
import BlogsPage from '../pages/blogs/page';
import BlogDetailPage from '../pages/blog-detail/page';
import AgencyProfilePage from '../pages/agencies/profile/page';
import InterviewDetailPage from '../pages/interview-detail/page';
import FounderDetailPage from '../pages/founder-detail/page';
import ExpertReviewDetailPage from '../pages/expert-review-detail/page';
import AuthorDetailPage from '../pages/author-detail/page';
import CategoryDetailPage from '../pages/category-detail/page';
import ToolDetailPage from '../pages/tool-detail/page';
import SearchPage from '../pages/search/page';
import NewsPage from '../pages/news/page';
import ReviewsPage from '../pages/reviews/page';
import InsightsPage from '../pages/insights/page';
import ProductReviewPage from '../pages/product-review/page';
import BestProjectManagementSoftwarePage from '../pages/best-project-management-software/page';

const routes: RouteObject[] = [
  { path: '/',                          element: <HomePage /> },
  { path: '/directory',                 element: <DirectoryPage /> },
  { path: '/tools',                     element: <TopProductsPage /> },
  { path: '/products/:slug',            element: <ProductDetailPage /> },
  { path: '/resource-centre/:tab',      element: <ResourceCentrePage /> },
  { path: '/blog/:slug',                element: <BlogDetailPage /> },
  { path: '/blogs',                     element: <BlogsPage /> },
  { path: '/agencies',                  element: <AgenciesPage /> },
  { path: '/agencies/profile',          element: <AgencyProfilePage /> },
  { path: '/agencies/:slug',            element: <AgencyProfilePage /> },
  { path: '/everything-ai',             element: <EverythingAIPage /> },
  { path: '/interviews-success-stories',element: <SuccessStoriesPage /> },
  { path: '/interviews/:slug',         element: <InterviewDetailPage /> },
  { path: '/founders/:slug',           element: <FounderDetailPage /> },
  { path: '/expert-reviews/:slug',     element: <ExpertReviewDetailPage /> },
  { path: '/authors/:slug',            element: <AuthorDetailPage /> },
  { path: '/categories/:slug',         element: <CategoryDetailPage /> },
  { path: '/tools/:slug',              element: <ToolDetailPage /> },
  { path: '/search',                   element: <SearchPage /> },
  { path: '/news',                      element: <NewsPage /> },
  { path: '/reviews',                   element: <ReviewsPage /> },
  { path: '/insights',                  element: <InsightsPage /> },
  { path: '/methodology',               element: <MethodologyPage /> },
  { path: '/services',                  element: <ServicesPage /> },
  { path: '/promote',                   element: <PromotePage /> },
  { path: '/promote/:category',         element: <PromoteCategoryPage /> },
  { path: '/product-review',            element: <ProductReviewPage /> },
  { path: '/top-10-project-management-software-2026', element: <BestProjectManagementSoftwarePage /> },
  { path: '/showcase',                  element: <StaticRedirect from="/showcase" /> },
  { path: '/products',                  element: <StaticRedirect from="/products" /> },
  { path: '/best-project-management-software', element: <StaticRedirect from="/best-project-management-software" /> },
  { path: '/product-review/:slug',      element: <ProductReviewRedirect /> },
  { path: '/resource-centre',           element: <Navigate to="/resource-centre/blogs" replace /> },
  { path: '*',                          element: <NotFound /> },
];

export default routes;
