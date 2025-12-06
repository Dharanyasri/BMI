import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";


import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import HealthTips from "./pages/HealthTips";
import LearnBMI from "./pages/LearnBMI";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import History from "@/pages/History";
import ProtectedRoute from "@/components/ProtectedRoute";
import CalorieCalculator from "./pages/CalorieCalculator";
import HealthDashboard from "./pages/HealthDashboard";


// ⭐ Missing earlier → added now
import IdealWeight from "./pages/IdealWeight";

const queryClient = new QueryClient();


const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
    {/* ⭐ Floating AI Chatbot - visible on all pages using Layout */}
    <ChatWidget />
  </div>
);


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>

          {/* Public Pages */}
          <Route path="/" element={<Index />} />

          <Route
            path="/calculator"
            element={
              <Layout>
                <Calculator />
              </Layout>
            }
          />

          <Route
            path="/tips"
            element={
              <Layout>
                <HealthTips />
              </Layout>
            }
          />

          <Route
            path="/learn"
            element={
              <Layout>
                <LearnBMI />
              </Layout>
            }
          />

          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />

          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Protected History Page */}
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />

          {/* ⭐ Ideal Weight Page */}
          <Route
            path="/ideal-weight"
            element={
              <Layout>
                <IdealWeight />
              </Layout>
            }
          />

          <Route
  path="/calories"
  element={
    <Layout>
      <CalorieCalculator />
    </Layout>
  }
/>

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Layout>
        <HealthDashboard />
      </Layout>
    </ProtectedRoute>
  }
/>



          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
