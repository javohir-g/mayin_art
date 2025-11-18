import { useState, useEffect } from "react";
import {
  Edit3,
  Plus,
  Trash2,
  Save,
  X,
  Image,
  LogOut,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import AdminLogin from "../components/AdminLogin";
import {
  getProducts,
  getCategories,
  getHeroSlides,
  updateProduct,
  updateCategory,
  updateHeroSlide,
  addProduct,
  addCategory,
  addHeroSlide,
  deleteProduct,
  deleteCategory,
  deleteHeroSlide,
  Product,
  Category,
  HeroSlide,
} from "../data/store";

export default function Admin() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminPanel />;
}

function AdminPanel() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "products" | "categories" | "carousel"
  >("products");
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [categories, setCategories] = useState<Category[]>(getCategories());
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(getHeroSlides());
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<any>({});
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const refreshData = () => {
    setProducts([...getProducts()]);
    setCategories([...getCategories()]);
    setHeroSlides([...getHeroSlides()]);
  };

  // Load data on mount to ensure we have the latest from localStorage
  useEffect(() => {
    refreshData();
  }, []);

  const handleEdit = (id: number) => {
    setEditingItem(id);
    setIsAdding(false);
  };

  const handleSave = (id: number, updates: any) => {
    try {
      if (activeTab === "products") {
        updateProduct(id, updates);
        showNotification("Product updated successfully!", "success");
      } else if (activeTab === "categories") {
        updateCategory(id, updates);
        showNotification("Category updated successfully!", "success");
      } else if (activeTab === "carousel") {
        updateHeroSlide(id, updates);
        showNotification("Carousel slide updated successfully!", "success");
      }
      setEditingItem(null);
      refreshData();
    } catch (error) {
      showNotification("Failed to update. Please try again.", "error");
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingItem(null);
    if (activeTab === "products") {
      setNewItem({
        name: "",
        description: "",
        price: "",
        category: "Lighting Sculptures",
        image: "",
        hoverImage: "",
      });
    } else if (activeTab === "categories") {
      setNewItem({
        name: "",
        image: "",
      });
    } else if (activeTab === "carousel") {
      setNewItem({
        title: "",
        description: "",
        image: "",
      });
    }
  };

  const handleSaveNew = () => {
    try {
      if (activeTab === "products") {
        addProduct(newItem);
        showNotification("Product added successfully!", "success");
      } else if (activeTab === "categories") {
        addCategory(newItem);
        showNotification("Category added successfully!", "success");
      } else if (activeTab === "carousel") {
        addHeroSlide(newItem);
        showNotification("Carousel slide added successfully!", "success");
      }
      setIsAdding(false);
      setNewItem({});
      refreshData();
    } catch (error) {
      showNotification(
        "Failed to add item. Please check your inputs.",
        "error",
      );
    }
  };

  const handleDelete = (id: number, name: string) => {
    const confirmMessage = `Are you sure you want to delete "${name}"? This action cannot be undone.`;
    if (window.confirm(confirmMessage)) {
      try {
        if (activeTab === "products") {
          deleteProduct(id);
          showNotification("Product deleted successfully!", "success");
        } else if (activeTab === "categories") {
          deleteCategory(id);
          showNotification("Category deleted successfully!", "success");
        } else if (activeTab === "carousel") {
          deleteHeroSlide(id);
          showNotification("Carousel slide deleted successfully!", "success");
        }
        refreshData();
      } catch (error) {
        showNotification("Failed to delete item. Please try again.", "error");
      }
    }
  };

  const getTabInfo = () => {
    switch (activeTab) {
      case "products":
        return {
          title: "Products",
          count: products.length,
          description:
            "Manage your product catalog including images, descriptions, and pricing",
        };
      case "categories":
        return {
          title: "Categories",
          count: categories.length,
          description:
            "Organize your products into different categories with custom images",
        };
      case "carousel":
        return {
          title: "Hero Carousel",
          count: heroSlides.length,
          description: "Control the main banner carousel on your homepage",
        };
      default:
        return { title: "", count: 0, description: "" };
    }
  };

  const tabInfo = getTabInfo();

  return (
    <main style={{ marginTop: "90px" }}>
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-24 right-4 z-50 p-4 rounded-xl shadow-lg border ${
            notification.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          } transition-all duration-300 transform`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span className="font-['Outfit'] text-[14px] font-medium">
              {notification.message}
            </span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1"></div>
            <h1 className="font-['Outfit'] font-medium text-[48px] leading-normal text-gray-900">
              Admin Dashboard
            </h1>
            <div className="flex-1 flex justify-end">
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-100"
              >
                <LogOut size={18} />
                <span className="font-['Outfit'] text-[14px]">Logout</span>
              </button>
            </div>
          </div>
          <p className="font-['Outfit'] font-light text-[18px] text-gray-600">
            Manage your website content with ease
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-50 rounded-2xl p-2 shadow-sm border border-gray-100">
            {[
              { key: "products", label: "Products", icon: "📦" },
              { key: "categories", label: "Categories", icon: "🏷️" },
              { key: "carousel", label: "Hero Carousel", icon: "🎠" },
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-['Outfit'] text-[16px] transition-all ${
                  activeTab === key
                    ? "bg-white text-black shadow-sm border border-gray-200"
                    : "text-gray-600 hover:text-black hover:bg-white/50"
                }`}
              >
                <span className="text-[18px]">{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Info */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-6 mb-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-['Outfit'] font-medium text-[28px] mb-2">
                {tabInfo.title}
              </h2>
              <p className="font-['Outfit'] font-light text-[16px] text-gray-200">
                {tabInfo.description}
              </p>
            </div>
            <div className="text-right">
              <div className="font-['Outfit'] font-bold text-[32px]">
                {tabInfo.count}
              </div>
              <div className="font-['Outfit'] font-light text-[14px] text-gray-300">
                Total Items
              </div>
            </div>
          </div>
        </div>

        {/* Add New Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleAdd}
            disabled={isAdding || editingItem !== null}
            className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-['Outfit'] text-[16px] font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <Plus size={20} />
            Add New{" "}
            {activeTab === "carousel" ? "Slide" : activeTab.slice(0, -1)}
          </button>
        </div>

        {/* Add New Form */}
        {isAdding && (
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-lg mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-['Outfit'] font-medium text-[24px] text-gray-900">
                Add New{" "}
                {activeTab === "carousel" ? "Slide" : activeTab.slice(0, -1)}
              </h3>
              <button
                onClick={() => setIsAdding(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            {activeTab === "products" && (
              <AddProductForm
                product={newItem}
                onChange={setNewItem}
                onSave={handleSaveNew}
                onCancel={() => setIsAdding(false)}
              />
            )}
            {activeTab === "categories" && (
              <AddCategoryForm
                category={newItem}
                onChange={setNewItem}
                onSave={handleSaveNew}
                onCancel={() => setIsAdding(false)}
              />
            )}
            {activeTab === "carousel" && (
              <AddCarouselForm
                slide={newItem}
                onChange={setNewItem}
                onSave={handleSaveNew}
                onCancel={() => setIsAdding(false)}
              />
            )}
          </div>
        )}

        {/* Content Grid */}
        {!isAdding && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeTab === "products" &&
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isEditing={editingItem === product.id}
                  onEdit={() => handleEdit(product.id)}
                  onSave={(updates) => handleSave(product.id, updates)}
                  onDelete={() => handleDelete(product.id, product.name)}
                  onCancel={() => setEditingItem(null)}
                />
              ))}
            {activeTab === "categories" &&
              categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  isEditing={editingItem === category.id}
                  onEdit={() => handleEdit(category.id)}
                  onSave={(updates) => handleSave(category.id, updates)}
                  onDelete={() => handleDelete(category.id, category.name)}
                  onCancel={() => setEditingItem(null)}
                />
              ))}
            {activeTab === "carousel" &&
              heroSlides.map((slide) => (
                <CarouselCard
                  key={slide.id}
                  slide={slide}
                  isEditing={editingItem === slide.id}
                  onEdit={() => handleEdit(slide.id)}
                  onSave={(updates) => handleSave(slide.id, updates)}
                  onDelete={() => handleDelete(slide.id, slide.title)}
                  onCancel={() => setEditingItem(null)}
                />
              ))}
          </div>
        )}
      </div>
    </main>
  );
}

// Product Card Component
const ProductCard = ({
  product,
  isEditing,
  onEdit,
  onSave,
  onDelete,
  onCancel,
}: {
  product: Product;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (updates: Partial<Product>) => void;
  onDelete: () => void;
  onCancel: () => void;
}) => (
  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all">
    {!isEditing ? (
      <>
        <div className="relative">
          <div className="grid grid-cols-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDIwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04Ny4wOTMzIDUwLjY2NjdIMTEyLjkwN0MxMTQuMTYxIDUwLjY2NjcgMTE1LjE1NCA1MS42NTk1IDExNS4xNTQgNTIuOTEzM1Y3NS4wODY3QzExNS4xNTQgNzYuMzQwNSAxMTQuMTYxIDc3LjMzMzMgMTEyLjkwNyA3Ny4zMzMzSDg3LjA5MzNDODUuODM5NSA3Ny4zMzMzIDg0Ljg0NjcgNzYuMzQwNSA4NC44NDY3IDc1LjA4NjdWNTIuOTEzM0M4NC44NDY3IDUxLjY1OTUgODUuODM5NSA1MC42NjY3IDg3LjA5MzMgNTAuNjY2N1oiIGZpbGw9IiNEMUQ1REIiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDNINUMyIDMgMiA1IDIgOFYxNkMyIDIxIDIgMjEgNSAyMUgxOUMyMSAyMSAyMiAyMSAyMiAxNlY4QzIyIDUgMjEgMyAxOSAzWiIgc3Ryb2tlPSIjOUI5QkEzIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik05IDlDOS41NTIyOCA5IDEwIDguNTUyMjggMTAgOEM5LjQ0NzcyIDggOSA4LjQ0NzcyIDkgOVoiIGZpbGw9IiM5QjlCQTMiLz4KPHN2ZyAvPgo=";
              }}
            />
            <img
              src={product.hoverImage}
              alt={`${product.name} hover`}
              className="w-full h-32 object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDIwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04Ny4wOTMzIDUwLjY2NjdIMTEyLjkwN0MxMTQuMTYxIDUwLjY2NjcgMTE1LjE1NCA1MS42NTk1IDExNS4xNTQgNTIuOTEzM1Y3NS4wODY3QzExNS4xNTQgNzYuMzQwNSAxMTQuMTYxIDc3LjMzMzMgMTEyLjkwNyA3Ny4zMzMzSDg3LjA5MzNDODUuODM5NSA3Ny4zMzMzIDg0Ljg0NjcgNzYuMzQwNSA4NC44NDY3IDc1LjA4NjdWNTIuOTEzM0M4NC44NDY3IDUxLjY1OTUgODUuODM5NSA1MC42NjY3IDg3LjA5MzMgNTAuNjY2N1oiIGZpbGw9IiNEMUQ1REIiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDNINUMyIDMgMiA1IDIgOFYxNkMyIDIxIDIgMjEgNSAyMUgxOUMyMSAyMSAyMiAyMSAyMiAxNlY4QzIyIDUgMjEgMyAxOSAzWiIgc3Ryb2tlPSIjOUI5QkEzIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik05IDlDOS41NTIyOCA5IDEwIDguNTUyMjggMTAgOEM5LjQ0NzcyIDggOSA4LjQ0NzcyIDkgOVoiIGZpbGw9IiM5QjlCQTMiLz4KPHN2ZyAvPgo=";
              }}
            />
          </div>
          <div className="absolute top-2 left-2 flex gap-1">
            <span className="text-xs bg-black/20 text-white px-2 py-1 rounded">
              Main
            </span>
          </div>
          <div className="absolute top-2 right-2 flex gap-1">
            <span className="text-xs bg-black/20 text-white px-2 py-1 rounded">
              Hover
            </span>
          </div>
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={onEdit}
              className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <Edit3 size={16} className="text-gray-600" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-['Outfit'] font-medium text-[20px] text-gray-900 truncate">
              {product.name}
            </h3>
          </div>
          <p className="font-['Outfit'] text-[14px] text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
              {product.category}
            </span>
            <p className="font-['Outfit'] font-semibold text-[16px] text-black">
              {product.price}
            </p>
          </div>
        </div>
      </>
    ) : (
      <EditProductForm product={product} onSave={onSave} onCancel={onCancel} />
    )}
  </div>
);

// Category Card Component
const CategoryCard = ({
  category,
  isEditing,
  onEdit,
  onSave,
  onDelete,
  onCancel,
}: {
  category: Category;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (updates: Partial<Category>) => void;
  onDelete: () => void;
  onCancel: () => void;
}) => (
  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all">
    {!isEditing ? (
      <>
        <div className="relative">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDQwMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzQuMTg3IDc2SDIyNS44MTNDMjI4LjMyMiA3NiAyMzAuMzU0IDc4LjAzMTkgMjMwLjM1NCA4MC41NFYxMTEuNDZDMjMwLjM1NCAxMTMuOTY4IDIyOC4zMjIgMTE2IDIyNS44MTMgMTE2SDE3NC4xODdDMTcxLjY3OCAxMTYgMTY5LjY0NiAxMTMuOTY4IDE2OS42NDYgMTExLjQ2VjgwLjU0QzE2OS42NDYgNzguMDMxOSAxNzEuNjc4IDc2IDE3NC4xODcgNzZaIiBmaWxsPSIjRDFENURCIi8+Cjwvc3ZnPgo=";
            }}
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="flex gap-2">
              <button
                onClick={onEdit}
                className="p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <Edit3 size={18} className="text-gray-600" />
              </button>
              <button
                onClick={onDelete}
                className="p-3 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors"
              >
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-['Outfit'] font-medium text-[24px] text-gray-900 text-center">
            {category.name}
          </h3>
        </div>
      </>
    ) : (
      <EditCategoryForm
        category={category}
        onSave={onSave}
        onCancel={onCancel}
      />
    )}
  </div>
);

// Carousel Card Component
const CarouselCard = ({
  slide,
  isEditing,
  onEdit,
  onSave,
  onDelete,
  onCancel,
}: {
  slide: HeroSlide;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (updates: Partial<HeroSlide>) => void;
  onDelete: () => void;
  onCancel: () => void;
}) => (
  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all">
    {!isEditing ? (
      <>
        <div className="relative">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDQwMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzQuMTg3IDc2SDIyNS44MTNDMjI4LjMyMiA3NiAyMzAuMzU0IDc4LjAzMTkgMjMwLjM1NCA4MC41NFYxMTEuNDZDMjMwLjM1NCAxMTMuOTY4IDIyOC4zMjIgMTE2IDIyNS44MTMgMTE2SDE3NC4xODdDMTcxLjY3OCAxMTYgMTY5LjY0NiAxMTMuOTY4IDE2OS42NDYgMTExLjQ2VjgwLjU0QzE2OS42NDYgNzguMDMxOSAxNzEuNjc4IDc2IDE3NC4xODcgNzZaIiBmaWxsPSIjRDFENURCIi8+Cjwvc3ZnPgo=";
            }}
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="flex gap-2">
              <button
                onClick={onEdit}
                className="p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <Edit3 size={18} className="text-gray-600" />
              </button>
              <button
                onClick={onDelete}
                className="p-3 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors"
              >
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-['Outfit'] font-medium text-[22px] text-gray-900 mb-2 truncate">
            {slide.title}
          </h3>
          <p className="font-['Outfit'] font-light text-[14px] text-gray-600 line-clamp-3">
            {slide.description}
          </p>
        </div>
      </>
    ) : (
      <EditCarouselForm slide={slide} onSave={onSave} onCancel={onCancel} />
    )}
  </div>
);

// Edit Product Form Component
const EditProductForm = ({
  product,
  onSave,
  onCancel,
}: {
  product: Product;
  onSave: (updates: Partial<Product>) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({ ...product });

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="text"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="e.g., 1 450 000 soʻm"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] h-20 resize-none focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="Enter product description"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
        >
          <option value="Lighting Sculptures">Lighting Sculptures</option>
          <option value="Vases & Art Objects">Vases & Art Objects</option>
          <option value="Interior Accessories">Interior Accessories</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Main Image URL
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hover Image URL
          </label>
          <input
            type="url"
            value={formData.hoverImage}
            onChange={(e) =>
              setFormData({ ...formData, hoverImage: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="https://example.com/hover-image.jpg"
          />
        </div>
      </div>
      <div className="flex gap-3 justify-end pt-4 border-t">
        <button
          onClick={onCancel}
          className="px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-['Outfit'] text-[14px]"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(formData)}
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-['Outfit'] text-[14px]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

// Edit Category Form Component
const EditCategoryForm = ({
  category,
  onSave,
  onCancel,
}: {
  category: Category;
  onSave: (updates: Partial<Category>) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({ ...category });

  return (
    <div className="p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="Enter category name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Background Image URL
        </label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="https://example.com/category-image.jpg"
        />
      </div>
      <div className="flex gap-3 justify-end pt-4 border-t">
        <button
          onClick={onCancel}
          className="px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-['Outfit'] text-[14px]"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(formData)}
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-['Outfit'] text-[14px]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

// Edit Carousel Form Component
const EditCarouselForm = ({
  slide,
  onSave,
  onCancel,
}: {
  slide: HeroSlide;
  onSave: (updates: Partial<HeroSlide>) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({ ...slide });

  return (
    <div className="p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Slide Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="Enter slide title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] h-24 resize-none focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="Enter slide description"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Background Image URL
        </label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="https://example.com/hero-image.jpg"
        />
      </div>
      <div className="flex gap-3 justify-end pt-4 border-t">
        <button
          onClick={onCancel}
          className="px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-['Outfit'] text-[14px]"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(formData)}
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-['Outfit'] text-[14px]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

// Add Product Form Component
const AddProductForm = ({
  product,
  onChange,
  onSave,
  onCancel,
}: {
  product: any;
  onChange: (product: any) => void;
  onSave: () => void;
  onCancel: () => void;
}) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name *
        </label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => onChange({ ...product, name: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="Enter product name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price *
        </label>
        <input
          type="text"
          value={product.price}
          onChange={(e) => onChange({ ...product, price: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="e.g., 1 450 000 soʻm"
          required
        />
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Description *
      </label>
      <textarea
        value={product.description}
        onChange={(e) => onChange({ ...product, description: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] h-20 resize-none focus:ring-2 focus:ring-black focus:border-transparent"
        placeholder="Enter product description"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Category *
      </label>
      <select
        value={product.category}
        onChange={(e) => onChange({ ...product, category: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
        required
      >
        <option value="Lighting Sculptures">Lighting Sculptures</option>
        <option value="Vases & Art Objects">Vases & Art Objects</option>
        <option value="Interior Accessories">Interior Accessories</option>
      </select>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Main Image URL *
        </label>
        <input
          type="url"
          value={product.image}
          onChange={(e) => onChange({ ...product, image: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hover Image URL *
        </label>
        <input
          type="url"
          value={product.hoverImage}
          onChange={(e) => onChange({ ...product, hoverImage: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="https://example.com/hover-image.jpg"
          required
        />
      </div>
    </div>
    <div className="flex gap-3 justify-end pt-4 border-t">
      <button
        onClick={onCancel}
        className="px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-['Outfit'] text-[14px]"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        disabled={
          !product.name ||
          !product.description ||
          !product.price ||
          !product.image ||
          !product.hoverImage
        }
        className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-['Outfit'] text-[14px]"
      >
        Add Product
      </button>
    </div>
  </div>
);

// Add Category Form Component
const AddCategoryForm = ({
  category,
  onChange,
  onSave,
  onCancel,
}: {
  category: any;
  onChange: (category: any) => void;
  onSave: () => void;
  onCancel: () => void;
}) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Category Name *
      </label>
      <input
        type="text"
        value={category.name}
        onChange={(e) => onChange({ ...category, name: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
        placeholder="Enter category name"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Background Image URL *
      </label>
      <input
        type="url"
        value={category.image}
        onChange={(e) => onChange({ ...category, image: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
        placeholder="https://example.com/category-image.jpg"
        required
      />
    </div>
    <div className="flex gap-3 justify-end pt-4 border-t">
      <button
        onClick={onCancel}
        className="px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-['Outfit'] text-[14px]"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        disabled={!category.name || !category.image}
        className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-['Outfit'] text-[14px]"
      >
        Add Category
      </button>
    </div>
  </div>
);

// Add Carousel Form Component
const AddCarouselForm = ({
  slide,
  onChange,
  onSave,
  onCancel,
}: {
  slide: any;
  onChange: (slide: any) => void;
  onSave: () => void;
  onCancel: () => void;
}) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Slide Title *
      </label>
      <input
        type="text"
        value={slide.title}
        onChange={(e) => onChange({ ...slide, title: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
        placeholder="Enter slide title"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Description *
      </label>
      <textarea
        value={slide.description}
        onChange={(e) => onChange({ ...slide, description: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] h-24 resize-none focus:ring-2 focus:ring-black focus:border-transparent"
        placeholder="Enter slide description"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Background Image URL *
      </label>
      <input
        type="url"
        value={slide.image}
        onChange={(e) => onChange({ ...slide, image: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-xl font-['Outfit'] text-[14px] focus:ring-2 focus:ring-black focus:border-transparent"
        placeholder="https://example.com/hero-image.jpg"
        required
      />
    </div>
    <div className="flex gap-3 justify-end pt-4 border-t">
      <button
        onClick={onCancel}
        className="px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-['Outfit'] text-[14px]"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        disabled={!slide.title || !slide.description || !slide.image}
        className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-['Outfit'] text-[14px]"
      >
        Add Slide
      </button>
    </div>
  </div>
);
