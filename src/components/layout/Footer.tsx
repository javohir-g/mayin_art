import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Logo */}
          <div>
            <Link to="/">
              <img
                src="/src/assets/logos/MAYIN.png"
                alt="MAYIN"
                className="h-[45px] w-auto mb-6"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4">
            <Link
              to="/catalog"
              className="font-['Outfit'] font-normal text-[20px] leading-normal text-black hover:text-gray-600 transition-colors"
            >
              Catalog
            </Link>
            <a
              href="#"
              className="font-['Outfit'] font-normal text-[20px] leading-normal text-black hover:text-gray-600 transition-colors"
            >
              Contact
            </a>
            <a
              href="#"
              className="font-['Outfit'] font-normal text-[20px] leading-normal text-black hover:text-gray-600 transition-colors"
            >
              About Us
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="flex items-center gap-4 font-['Outfit'] font-normal text-[26px] leading-normal text-black hover:text-gray-600 transition-colors group"
            >
              <div className="p-2 border border-black rounded-full group-hover:bg-gray-100 transition-colors">
                <Instagram className="w-6 h-6" />
              </div>
              <span>mayin.art.uz</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 font-['Outfit'] font-normal text-[26px] leading-normal text-black hover:text-gray-600 transition-colors group"
            >
              <div className="p-2 border border-black rounded-full group-hover:bg-gray-100 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                </svg>
              </div>
              <span>mayinuz_bot</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
