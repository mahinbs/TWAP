import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import ScrollToTop from "./components/feature/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
