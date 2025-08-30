import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Drawings from "./pages/Drawings";
import Contact from "./pages/Contact";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { MobileCtaBar, StickyWhatsApp } from "./components/MobileCtaBar";

const queryClient = new QueryClient();

import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProjects from "./pages/admin/ProjectsAdmin";
import AdminDrawings from "./pages/admin/DrawingsAdmin";
import { isAdminAuthed } from "./lib/admin";

function RoutesWrapper() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  const Protected = ({ element }: { element: JSX.Element }) =>
    isAdminAuthed() ? element : <Navigate to="/admin/login" replace />;

  return (
    <>
      {!isAdmin && <SiteHeader />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/drawings" element={<Drawings />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={<Protected element={<AdminDashboard />} />}
        />
        <Route
          path="/admin/projects"
          element={<Protected element={<AdminProjects />} />}
        />
        <Route
          path="/admin/drawings"
          element={<Protected element={<AdminDrawings />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdmin && (
        <>
          <SiteFooter />
          <MobileCtaBar />
          <StickyWhatsApp />
        </>
      )}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RoutesWrapper />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;
const existingRoot = (window as any).__appRoot as
  | ReturnType<typeof createRoot>
  | undefined;
if (existingRoot) {
  existingRoot.render(<App />);
} else {
  const root = createRoot(container);
  (window as any).__appRoot = root;
  root.render(<App />);
}
