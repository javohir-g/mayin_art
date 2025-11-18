import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../../contexts/CartContext";

export default function CartDrawer() {
  const {
    items,
    itemCount,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
    isCartOpen,
    closeCart,
  } = useCart();

  // Format price with thousand separators
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " soʻm";
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Cart Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-gray-700" />
              <h2 className="font-['Outfit'] font-medium text-[24px] text-gray-900">
                Shopping Cart
              </h2>
              {itemCount > 0 && (
                <span className="bg-black text-white text-sm px-2 py-1 rounded-full font-['Outfit'] font-medium">
                  {itemCount}
                </span>
              )}
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Cart Content */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="font-['Outfit'] font-medium text-[20px] text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="font-['Outfit'] text-[16px] text-gray-500 mb-6">
                Add some beautiful items to your cart
              </p>
              <button
                onClick={closeCart}
                className="bg-black text-white px-6 py-3 rounded-xl font-['Outfit'] font-medium hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-gray-50 rounded-2xl p-4"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-['Outfit'] font-medium text-[16px] text-gray-900 truncate mb-1">
                        {item.name}
                      </h4>
                      <p className="font-['Outfit'] text-[14px] text-gray-500 mb-2">
                        {item.category}
                      </p>
                      <p className="font-['Outfit'] font-medium text-[16px] text-gray-900">
                        {item.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-red-100 rounded text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="px-3 py-1 font-['Outfit'] font-medium text-[14px] min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 p-6 space-y-4">
                {/* Clear Cart Button */}
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="w-full text-center font-['Outfit'] text-[14px] text-red-500 hover:text-red-700 transition-colors py-2"
                  >
                    Clear Cart
                  </button>
                )}

                {/* Total */}
                <div className="flex justify-between items-center py-4 border-t border-gray-100">
                  <span className="font-['Outfit'] font-medium text-[18px] text-gray-900">
                    Total:
                  </span>
                  <span className="font-['Outfit'] font-semibold text-[24px] text-black">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-black text-white py-4 rounded-2xl font-['Outfit'] font-medium text-[16px] hover:bg-gray-800 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                  Proceed to Checkout
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={closeCart}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-['Outfit'] font-medium text-[16px] hover:bg-gray-200 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
