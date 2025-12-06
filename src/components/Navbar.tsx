import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Activity } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const token = localStorage.getItem("token");

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const userName = user?.name || "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/calculator", label: "Calculator" },
    { path: "/ideal-weight", label: "Ideal Weight" },
    { path: "/history", label: "History" },
    { path: "/learn", label: "Learn" },
    { path: "/tips", label: "Tips" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/calories", label: "Calories" },
    { path: "/dashboard", label: "Dashboard" },


  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2.5 rounded-2xl bg-gradient-wellness transition-transform group-hover:scale-105 shadow-soft">
              <Activity className="w-6 h-6 text-foreground" />
            </div>
            <span className="font-semibold text-xl">BMI Calculator</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "rounded-full transition-all",
                    isActive(link.path) && "bg-primary/30 text-foreground font-medium"
                  )}
                >
                  {link.label}
                </Button>
              </Link>
            ))}

            {token ? (
              <div className="flex items-center gap-4 ml-4">
                <span className="font-medium text-foreground">Hi, {userName} 👋</span>
                <Button 
                  onClick={handleLogout} 
                  className="bg-destructive text-white rounded-full"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button className="ml-4 rounded-full">Login</Button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2.5 rounded-2xl hover:bg-accent/30 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start rounded-full",
                      isActive(link.path) && "bg-primary/30 text-foreground font-medium"
                    )}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}

              {token ? (
                <div className="flex flex-col mt-4">
                  <span className="px-2 py-2 text-left font-medium">
                    Hi, {userName} 👋
                  </span>
                  <Button 
  onClick={handleLogout} 
  className="rounded-full bg-[#FF8F8F] hover:bg-[#FF7575] text-white transition"
>
  Logout
</Button>

                </div>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full mt-2 rounded-full">Login</Button>
                </Link>
              )}
            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
