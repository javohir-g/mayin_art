import { useState, useMemo, useEffect, useRef } from "react";
import {
  getProducts,
  getCategories,
  subscribeToProducts,
  subscribeToCategories,
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
        className="relative aspect-square overflow-hidden mb-4 bg-gray-100"
        style={{ borderRadius: "25px" }}
      >
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-200"
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-['Outfit'] font-medium text-[28px] leading-normal">
          {product.name}
        </h3>
        <p className="font-['Outfit'] font-light text-[18px] leading-normal text-[#8b8989]">
          {product.description}
        </p>
        <p className="font-['Outfit','Noto_Sans'] font-medium text-[28px] leading-normal text-black">
          {product.price}
        </p>
      </div>
    </article>
  );
}

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState(getProducts());
  const [categories, setCategories] = useState(getCategories());
  const categoryNames = ["All", ...categories.map((c) => c.name)];
  const { addToCart } = useCart();

  // Subscribe to data changes and load initial data
  useEffect(() => {
    // Load initial data
    setProducts(getProducts());
    setCategories(getCategories());

    // Subscribe to changes
    const unsubscribeProducts = subscribeToProducts(() => {
      setProducts(getProducts());
    });

    const unsubscribeCategories = subscribeToCategories(() => {
      setCategories(getCategories());
    });

    return () => {
      unsubscribeProducts();
      unsubscribeCategories();
    };
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price") {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ""));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ""));
        return priceA - priceB;
      }
      return 0;
    });

    return filtered;
  }, [selectedCategory, sortBy, products]);

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
      <div className="container mx-auto px-4 md:px-8 py-8">
        {/* Page Title */}
        <h1 className="font-['Outfit'] font-medium text-[64px] leading-normal text-center mb-8">
          Catalog
        </h1>

        {/* Filters Bar */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categoryNames.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-['Outfit'] text-[16px] transition-colors ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-full px-4 py-2 font-['Outfit'] text-[16px] focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-['Outfit'] text-[24px] text-gray-500 mb-4">
              No products found
            </p>
            <p className="font-['Outfit'] text-[16px] text-gray-400">
              Try adjusting your filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="mt-12 text-center">
          <p className="font-['Outfit'] text-[18px] text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Product Modal */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            isOpen={true}
            onClose={handleCloseModal}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>
    </main>
  );
}
