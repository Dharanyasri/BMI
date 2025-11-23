import { Link } from "react-router-dom";
import { Activity, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/20 border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-gradient-wellness shadow-soft">
                <Activity className="w-6 h-6 text-foreground" />
              </div>
              <span className="font-semibold text-xl">BMI Calculator</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted companion for health and wellness. Calculate your BMI and start your journey to a healthier lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/calculator" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Learn BMI
                </Link>
              </li>
              <li>
                <Link to="/tips" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Health Tips
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <Link 
                to="/contact" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </Link>
              <p className="text-sm text-muted-foreground">
                We're here to help you on your wellness journey
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} BMI Calculator. Built with <Heart className="w-4 h-4 inline text-destructive" /> for your health.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">Privacy</button>
              <button className="hover:text-foreground transition-colors">Terms</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
