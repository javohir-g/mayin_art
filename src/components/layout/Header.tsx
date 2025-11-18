import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

interface HeaderProps {
  isVisible?: boolean;
}

export default function Header({ isVisible = true }: HeaderProps) {
  const location = useLocation();
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="container mx-auto px-4 md:px-8 py-6 flex items-center justify-between">
  {/* Navigation Links (hidden on small screens via Tailwind) */}
  <div className="hidden md:flex items-center gap-8 md:gap-12">
          <Link
            to="/"
            className={`font-['Outfit'] font-normal text-[20px] transition-colors ${
              location.pathname === "/"
                ? "text-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Home
          </Link>
          <Link
            to="/catalog"
            className={`font-['Outfit'] font-normal text-[20px] transition-colors ${
              location.pathname === "/catalog"
                ? "text-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Catalog
          </Link>
          <a
            href="#"
            className="font-['Outfit'] font-normal text-[20px] text-gray-600 hover:text-black transition-colors"
          >
            Contact
          </a>
          <Link
            to="/admin"
            className={`font-['Outfit'] font-normal text-[20px] transition-colors ${
              location.pathname === "/admin"
                ? "text-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Admin
          </Link>
    </div>

    {/* Mobile hamburger (hidden on md+) */}
  {/* Logo */}
  <div className="absolute left-1/2 -translate-x-1/2 z-0">
          <Link to="/">
            <img
              src="/src/assets/logos/MAYIN.png"
              alt="MAYIN"
              className="h-[45px] w-auto"
            />
          </Link>
        </div>

  {/* Icons */}
  <div className="flex items-center gap-4 z-50">
          {/* Hamburger visible only on small screens */}
          <button
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="md:hidden block p-2 hover:bg-gray-100 rounded-md z-50"
          >
            <Menu className="w-6 h-6" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-6 h-6" />
          </button>
          <button
            onClick={openCart}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-['Outfit'] font-medium">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel: fixed and placed above the header so clicks work reliably */}
      <div
        className={`md:hidden fixed left-0 right-0 top-[72px] bg-white border-t shadow-lg z-50 transform transition-transform duration-200 ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ willChange: "transform" }}
      >
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <Link to="/">
              <img src="/src/assets/logos/MAYIN.png" alt="MAYIN" className="h-8 w-auto" />
            </Link>
          </div>
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-md"
            aria-expanded={mobileOpen}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-4 pb-6 flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`font-['Outfit'] text-lg ${
              location.pathname === "/" ? "text-black" : "text-gray-700"
            }`}
          >
            Home
          </Link>
          <Link
            to="/catalog"
            onClick={() => setMobileOpen(false)}
            className={`font-['Outfit'] text-lg ${
              location.pathname === "/catalog" ? "text-black" : "text-gray-700"
            }`}
          >
            Catalog
          </Link>
          <a
            href="#"
            onClick={() => setMobileOpen(false)}
            className="font-['Outfit'] text-lg text-gray-700"
          >
            Contact
          </a>
          <Link
            to="/admin"
            onClick={() => setMobileOpen(false)}
            className={`font-['Outfit'] text-lg ${
              location.pathname === "/admin" ? "text-black" : "text-gray-700"
            }`}
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
