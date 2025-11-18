import { useState, useEffect, useRef } from "react";
import {
  getProducts,
  getCategories,
  getHeroSlides,
  subscribeToProducts,
  subscribeToCategories,
  subscribeToHeroSlides,
  Product,
} from "../data/store";
import ProductModal from "../components/product/ProductModal";
import { useCart } from "../contexts/CartContext";

// Product Card Component with Mouse Position Image Changing
function ProductCard({ 
  product, 
  onClick 
}: { 
  product: Product; 
  onClick: () => void;
}) {
  const [currentImage, setCurrentImage] = useState(product.image);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;

    // Smoothly change image based on mouse position
    // Left side shows main image, right side shows hover image
    if (percentage < 0.5) {
      setCurrentImage(product.image);
    } else {
      setCurrentImage(product.hoverImage);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImage(product.image);
  };

  return (
    <article
      ref={cardRef}
      className="group cursor-pointer hover:transform hover:scale-105 transition-all duration-300"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative aspect-square rounded-[25px] overflow-hidden mb-2 bg-gray-100"
        style={{ borderRadius: "25px" }}
      >
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-200"
        />
      </div>
      <h3 className="font-['Outfit'] font-medium text-[28px] leading-normal mb-1">
        {product.name}
      </h3>
      <p className="font-['Outfit'] font-light text-[18px] leading-normal text-[#8b8989] mb-1">
        {product.description}
      </p>
      <p className="font-['Outfit','Noto_Sans'] font-medium text-[28px] leading-normal text-black">
        {product.price}
      </p>
    </article>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState(getHeroSlides());
  const [products, setProducts] = useState(getProducts());
  const [categories, setCategories] = useState(getCategories());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  // Subscribe to data changes and load initial data
  useEffect(() => {
    // Load initial data
    setProducts(getProducts());
    setCategories(getCategories());
    setHeroSlides(getHeroSlides());

    // Subscribe to changes
    const unsubscribeProducts = subscribeToProducts(() => {
      setProducts(getProducts());
    });

    const unsubscribeCategories = subscribeToCategories(() => {
      setCategories(getCategories());
    });

    const unsubscribeHeroSlides = subscribeToHeroSlides(() => {
      setHeroSlides(getHeroSlides());
    });

    return () => {
      unsubscribeProducts();
      unsubscribeCategories();
      unsubscribeHeroSlides();
    };
  }, []);

  // Auto-scroll carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
  };

  return (
    <main style={{ marginTop: "90px" }}>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden rounded-[25px]"
        style={{
          height: "620px",
          borderRadius: "25px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('${heroSlides[currentSlide].image}')`,
          }}
        />
        <div
          className="relative h-full container mx-auto flex flex-col justify-end"
          style={{
            paddingBottom: "25px",
            paddingLeft: "25px",
            paddingRight: "25px",
          }}
        >
          <div className="max-w-3xl text-white">
            <h2
              className="font-['Outfit'] font-normal leading-normal mb-6 transition-opacity duration-500"
              style={{ fontSize: "50px" }}
            >
              {heroSlides[currentSlide].title}
            </h2>
            <p className="font-['Outfit'] font-light text-[18px] leading-normal mb-8 opacity-90 max-w-2xl transition-opacity duration-500">
              {heroSlides[currentSlide].description}
            </p>
            <button
              className="font-['Outfit'] font-light text-[22.8px] bg-white text-black px-8 py-3 hover:bg-gray-100 transition-colors"
              style={{ borderRadius: "25px" }}
            >
              See details
            </button>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-8">
        <h2 className="font-['Outfit'] font-medium text-[64px] leading-normal text-center mb-6 md:mb-8">
          Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative h-[400px] md:h-[500px] lg:h-[670px] overflow-hidden"
              style={{ borderRadius: "25px" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${category.image}')`,
                }}
              />
              <div className="relative h-full flex flex-col justify-end p-8 md:p-10 rounded-[25px]">
                <h3 className="font-['Outfit'] font-normal text-[38px] leading-normal text-white mb-6">
                  {category.name}
                </h3>
                <button
                  className="font-['Outfit'] font-light text-[22.8px] bg-white text-black px-8 py-3 hover:bg-gray-100 transition-colors w-fit"
                  style={{ borderRadius: "25px" }}
                >
                  See details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-8">
        <h2 className="font-['Outfit'] font-medium text-[64px] leading-normal text-center mb-6 md:mb-8">
          Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            className="font-['Outfit'] font-light text-[22.8px] bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
            style={{ borderRadius: "25px" }}
          >
            See details
          </button>
        </div>
      </section>

      {/* Top Sales Section */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-8">
        <h2 className="font-['Outfit'] font-medium text-[64px] leading-normal text-center mb-6 md:mb-8">
          Top sales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={`top-${product.id}`}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            className="font-['Outfit'] font-light text-[22.8px] bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
            style={{ borderRadius: "25px" }}
          >
            See details
          </button>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={true}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </main>
  );
}
