import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { slugOrder } from "@/pages/Home";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Admin", href: "/admin" },
  ];

  const categories = [
    {
      name: "Derma Gold Intense Glow Cream ",
      href: "/products?category=serum",
    },
    { name: "Derma White ", href: "/products?category=moisturizer" },
    { name: "G4 Max Glow ", href: "/products?category=toner" },
    { name: "Tablet UV Shield ", href: "/products?category=cleanser" },
    { name: "Porcelain Beauty Kit ", href: "/products?category=cleanser" },
    { name: "Korean Glass Kit ", href: "/products?category=cleanser" },
    { name: "Retinol Serum ", href: "/products?category=cleanser" },
  ];

  return (
    <footer className="bg-sage-dark text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/logo2.jpg"
                alt="not found"
                className="w-32 rounded-xl"
              />
              {/* <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center">
                <span className="text-sage-dark font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-bold">Welkin</span> */}
            </div>
            <p className="text-sage-light text-sm leading-relaxed">
              Your daily ritual of radiance. Premium skincare products crafted
              with scientifically-proven ingredients for healthy, glowing skin.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:bg-sage hover:text-sage-dark"
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sage-light hover:text-background transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shop By Products</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={category.name}>
                  <Link
                    to={`/products/${slugOrder[index]}`} // use slugOrder by index
                    className="text-sage-light hover:text-background transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-sage-light" />
                <span className="text-sage-light text-sm">
                  welkin.pharma@gmail.com
                </span>
              </div>
              <a
                href="https://wa.me/917000060407"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sage-light text-sm hover:text-green-500 transition-colors"
              >
                <FaWhatsapp className="w-4 h-4" />
                Message Only
                <span>+91 7000060407</span>
              </a>

              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-sage-light mt-0.5" />
                <span className="text-sage-light text-sm">
                  Welkin Pharmaceuticals <br />
                  19, Hussain Building,
                  <br />
                  1st Floor , Opp. Modi Medical Stores,
                  <br /> Old Saifia College Road Bhopal (MP) <br />
                  Pin Code - 462001{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-sage" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sage-light text-sm">
            © {currentYear} Welkin Skincare. All rights reserved.
          </div>
          <div className="text-sage-light text-sm">
            Developed and maintained by{" "}
            <a
              href="https://www.mahitechnocrafts.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background hover:text-sage-light transition-colors font-medium"
            >
              Mahi Technocrafts
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
