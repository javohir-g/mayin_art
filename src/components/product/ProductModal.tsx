import { useState, useEffect } from "react";
import { X, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "../../data/store";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get all available images
  const images = [product.image, product.hoverImage].filter(Boolean);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setCurrentImageIndex(0);
    }
  }, [product.id]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle arrow keys for image navigation
  useEffect(() => {
    if (!isOpen || images.length <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    onAddToCart(product, 1);
    onClose();
  };

  const goToNext = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const goToPrevious = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Transparent Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-500 ease-out ${
          isOpen ? "opacity-0" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container with Smooth Animations */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-[10000] pointer-events-none">
        <div
          className={`relative bg-white rounded-[25px] shadow-2xl max-w-2xl w-full transform transition-all duration-500 ease-out pointer-events-auto ${
            isOpen
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-95 opacity-0 translate-y-8"
          }`}
          onClick={(e) => e.stopPropagation()}
          style={{ borderRadius: "25px" }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[10001] p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:rotate-90 hover:bg-white group"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" />
          </button>

          <div className="p-8">
            {/* Product Image Gallery */}
            <div
              className="relative overflow-hidden rounded-[25px] bg-gray-100 mb-6 group"
              style={{ height: "400px", borderRadius: "25px" }}
            >
              <div className="relative h-full w-full">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='sans-serif' font-size='18'%3EImage not available%3C/text%3E%3C/svg%3E";
                    }}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "w-8 bg-white"
                          : "w-2 bg-white/50 hover:bg-white/75"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              {/* Product Name */}
              <h2 className="font-['Outfit'] font-medium text-[32px] leading-normal text-black transition-opacity duration-500">
                {product.name}
              </h2>

              {/* Description */}
              <p className="font-['Outfit'] font-light text-[18px] leading-normal text-[#8b8989] transition-opacity duration-500">
                {product.description}
              </p>

              {/* Price and Add to Cart */}
              <div className="flex items-center justify-between pt-4 transition-opacity duration-500">
                <p className="font-['Outfit','Noto_Sans'] font-medium text-[28px] leading-normal text-black">
                  {product.price}
                </p>

                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white px-8 py-3 rounded-full font-['Outfit'] font-light text-[18px] hover:bg-gray-800 transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
