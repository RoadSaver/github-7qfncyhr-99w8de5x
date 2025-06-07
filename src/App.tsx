
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';
import GoogleMapsSetup from './components/GoogleMapsSetup';
import Index from "./pages/Index";
import UserAuth from "./pages/user/Auth";
import UserDashboard from "./pages/user/Dashboard";
import EmployeeAuth from "./pages/employee/EmployeeAuth";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import AdminAuth from "./pages/admin/AdminAuth";
import MigrationPanel from "./components/admin/MigrationPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GoogleMapsSetup>
      <ThemeProvider>
        <AppProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/user" element={<UserAuth />} />
                <Route path="/user/dashboard" element={<UserDashboard />} />
                <Route path="/employee" element={<EmployeeAuth />} />
                <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                <Route path="/admin" element={<AdminAuth />} />
                <Route path="/migration" element={<MigrationPanel />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AppProvider>
      </ThemeProvider>
    </GoogleMapsSetup>
  </QueryClientProvider>
);

export default App;
