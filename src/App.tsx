import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import ScrollToTop from "./components/feature/ScrollToTop";
import PageSeo from "./components/seo/PageSeo";
import { SeoProvider } from "./components/seo/SeoContext";
import { useRealtimeSync } from "./hooks/useRealtimeSync";

function RealtimeBridge() {
  useRealtimeSync();
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <RealtimeBridge />
      <SeoProvider>
        <ScrollToTop />
        <PageSeo />
        <AppRoutes />
      </SeoProvider>
    </BrowserRouter>
  );
}

export default App;
