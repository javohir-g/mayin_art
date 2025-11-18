import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Plus, Minus, ShoppingCart, Heart, ArrowLeft, Check, Truck, Shield, Star } from "lucide-react";
import { getProducts, Product } from "../data/store";
import { useCart } from "../contexts/CartContext";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const products = getProducts();
    const foundProduct = products.find((p) => p.id === Number(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
      setCurrentImage(foundProduct.image);
      
      // Get related products (same category, excluding current)
      const related = products
        .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 3);
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <main style={{ marginTop: "90px" }}>
        <div className="container mx-auto px-4 md:px-8 py-16 text-center">
          <h1 className="font-['Outfit'] font-medium text-[48px] mb-4">Product Not Found</h1>
          <p className="font-['Outfit'] text-[18px] text-gray-600 mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="font-['Outfit'] font-light text-[22.8px] bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors inline-block"
            style={{ borderRadius: "25px" }}
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const images = [product.image, product.hoverImage].filter(Boolean);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <main style={{ marginTop: "90px" }}>
      {/* Back Button */}
      <section className="container mx-auto px-4 md:px-8 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-['Outfit'] font-light text-[18px] text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </section>

      {/* Product Hero Section */}
      <section className="container mx-auto px-4 md:px-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative overflow-hidden rounded-[25px] bg-gray-100"
              style={{ height: "600px" }}
            >
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='sans-serif' font-size='18'%3EImage not available%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(img)}
                    className={`flex-1 h-24 rounded-[15px] overflow-hidden border-2 transition-all ${
                      currentImage === img
                        ? "border-black shadow-lg"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium font-['Outfit']">
                {product.category}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="font-['Outfit'] font-medium text-[52px] lg:text-[64px] leading-tight text-black mb-4">
              {product.name}
            </h1>

            {/* Description */}
            <p className="font-['Outfit'] font-light text-[20px] leading-relaxed text-[#8b8989] mb-8">
              {product.description}
            </p>

            {/* Price */}
            <div className="mb-8">
              <p className="font-['Outfit','Noto_Sans'] font-medium text-[40px] text-black mb-2">
                {product.price}
              </p>
              <p className="font-['Outfit'] text-[16px] text-gray-500">
                Free delivery within Tashkent
              </p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="font-['Outfit'] font-medium text-[24px] text-black mb-4">
                Features
              </h3>
              <ul className="space-y-3">
                {[
                  "Premium quality materials",
                  "Handcrafted with attention to detail",
                  "Unique artistic design",
                  "Perfect for luxury interiors",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                    <span className="font-['Outfit'] text-[18px]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-[20px]">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-['Outfit'] font-medium text-[14px] text-gray-900">In Stock</p>
                  <p className="font-['Outfit'] text-[12px] text-gray-500">Ready to ship</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-[20px]">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-['Outfit'] font-medium text-[14px] text-gray-900">Free Delivery</p>
                  <p className="font-['Outfit'] text-[12px] text-gray-500">Within Tashkent</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-[20px]">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-['Outfit'] font-medium text-[14px] text-gray-900">Warranty</p>
                  <p className="font-['Outfit'] text-[12px] text-gray-500">1 year included</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-[20px]">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-['Outfit'] font-medium text-[14px] text-gray-900">Premium</p>
                  <p className="font-['Outfit'] text-[12px] text-gray-500">Luxury quality</p>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-6 mb-8">
              <span className="font-['Outfit'] font-medium text-[18px] text-gray-700">
                Quantity:
              </span>
              <div className="flex items-center border-2 border-gray-200 rounded-[20px] overflow-hidden bg-white">
                <button
                  onClick={decreaseQuantity}
                  className="p-4 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-5 h-5 text-gray-600" />
                </button>
                <span className="px-8 py-4 font-['Outfit'] font-semibold text-[20px] min-w-[80px] text-center border-x border-gray-200">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white px-8 py-4 rounded-[25px] font-['Outfit'] font-light text-[22.8px] hover:bg-gray-800 transition-colors flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-4 rounded-[25px] border-2 transition-all ${
                  isLiked
                    ? "bg-red-50 border-red-300 text-red-600"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Description Section */}
      <section className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-['Outfit'] font-medium text-[64px] leading-normal text-center mb-12">
            About This Product
          </h2>
          
          <div className="space-y-6 text-center">
            <p className="font-['Outfit'] font-light text-[20px] leading-relaxed text-gray-600">
              {product.name} represents the pinnacle of artistic craftsmanship and modern design. 
              Each piece is meticulously handcrafted by skilled artisans who bring decades of 
              experience to every creation.
            </p>
            <p className="font-['Outfit'] font-light text-[20px] leading-relaxed text-gray-600">
              This exceptional piece from our {product.category} collection combines timeless 
              elegance with contemporary aesthetics, making it a perfect addition to any luxury 
              interior space.
            </p>
            <p className="font-['Outfit'] font-light text-[20px] leading-relaxed text-gray-600">
              Crafted with premium materials and attention to detail, this product is designed to 
              be both a functional piece and a work of art that will be cherished for generations.
            </p>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <h2 className="font-['Outfit'] font-medium text-[64px] leading-normal text-center mb-6 md:mb-8">
            Related Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="group cursor-pointer hover:transform hover:scale-105 transition-all duration-300"
              >
                <div
                  className="relative aspect-square rounded-[25px] overflow-hidden mb-2 bg-gray-100"
                  style={{ borderRadius: "25px" }}
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                    src={relatedProduct.hoverImage}
                    alt={relatedProduct.name}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  />
                </div>
                <h3 className="font-['Outfit'] font-medium text-[28px] leading-normal mb-1">
                  {relatedProduct.name}
                </h3>
                <p className="font-['Outfit'] font-light text-[18px] leading-normal text-[#8b8989] mb-1">
                  {relatedProduct.description}
                </p>
                <p className="font-['Outfit','Noto_Sans'] font-medium text-[28px] leading-normal text-black">
                  {relatedProduct.price}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

