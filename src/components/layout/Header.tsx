import { Search, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

interface HeaderProps {
  isVisible?: boolean;
}

export default function Header({ isVisible = true }: HeaderProps) {
  const location = useLocation();
  const { itemCount, openCart } = useCart();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="container mx-auto px-4 md:px-8 py-6 flex items-center justify-between">
        {/* Navigation Links */}
        <div className="flex items-center gap-8 md:gap-12">
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

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/">
            <img
              src="/src/assets/logos/MAYIN.png"
              alt="MAYIN"
              className="h-[45px] w-auto"
            />
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
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
    </header>
  );
}
