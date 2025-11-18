export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  hoverImage: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1657494808491-6140d313a95e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBsYW1wJTIwc3Vuc2V0fGVufDF8fHx8MTc2MzI3MjA5NHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Waves Collection — the Poetry of Motion",
    description:
      "The Waves Collection captures the quiet elegance of flowing forms and the natural rhythm of movement. Each piece is shaped like a moment frozen in motion — a gentle curve, a rising crest, a smooth descent.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1760385737072-3b59d152c352?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaWdodGluZyUyMGludGVyaW9yfGVufDF8fHx8MTc2MzI3MzA4MXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Illuminating Elegance",
    description:
      "Discover our curated collection of luxury lighting sculptures that transform spaces into works of art. Each piece carefully crafted to bring warmth and sophistication to your interior.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1761329724797-6361e3d89620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwdmFzZSUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYzMjczMDgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Vases & Art Objects",
    description:
      "Elegant vessels that celebrate craftsmanship and design. From minimalist forms to bold statements, each piece is a testament to the beauty of functional art.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1762344694142-7d09f51a685c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzY3VscHR1cmUlMjBhcnR8ZW58MXx8fHwxNjMyNzMwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Sculptural Artistry",
    description:
      "Experience the intersection of form and function. Our modern sculptures blend contemporary design with timeless beauty, creating statement pieces for discerning collectors.",
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Lightshell",
    description: "Soft waves illuminate",
    price: "1 450 000 soʻm",
    category: "Lighting Sculptures",
    image:
      "https://images.unsplash.com/photo-1610247673420-52d9683002eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwdmFzZSUyMHdoaXRlfGVufDF8fHx8MTc2MzE5NjE0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    hoverImage:
      "https://images.unsplash.com/photo-1565374235393-6fe32a07cc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc2MzI3MjA5NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    name: "Veyla",
    description: "Elegance flows softly",
    price: "1 890 000 soʻm",
    category: "Vases & Art Objects",
    image:
      "https://images.unsplash.com/photo-1761330439582-c7fd39368cff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3aGl0ZSUyMHZhc2V8ZW58MXx8fHwxNzYzMjcyMDk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    hoverImage:
      "https://images.unsplash.com/photo-1658280595889-04d0d5185baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwdmFzZXN8ZW58MXx8fHwxNzYzMjcyMDk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    name: "Liora",
    description: "Light shapes serenity",
    price: "1 650 000 soʻm",
    category: "Lighting Sculptures",
    image:
      "https://images.unsplash.com/photo-1655255201488-766303d720a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY2VyYW1pY3xlbnwxfHx8fDE3NjMyMjczNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hoverImage:
      "https://images.unsplash.com/photo-1760793957091-c92a8f9ef3a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWdodGluZyUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NjMyNzIwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    name: "Moroa",
    description: "Sculpture becomes calm",
    price: "1 200 000 soʻm",
    category: "Interior Accessories",
    image:
      "https://images.unsplash.com/photo-1762548470420-49f55dee86df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3VscHR1cmFsJTIwdmFzZXxlbnwxfHx8fDE3NjMyNzIwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hoverImage:
      "https://images.unsplash.com/photo-1565193565695-7144271f8501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjZXJhbWljc3xlbnwxfHx8fDE3NjMyNzIwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    name: "Lineo",
    description: "Lines define harmony",
    price: "420 000 soʻm",
    category: "Interior Accessories",
    image:
      "https://images.unsplash.com/photo-1565193565695-7144271f8501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjZXJhbWljc3xlbnwxfHx8fDE3NjMyNzIwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hoverImage:
      "https://images.unsplash.com/photo-1607556672044-6110fc499247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHBvdHRlcnl8ZW58MXx8fHwxNzYzMjcyMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    name: "Tovi",
    description: "Minimalism feels alive",
    price: "350 000 soʻm",
    category: "Vases & Art Objects",
    image:
      "https://images.unsplash.com/photo-1607556672044-6110fc499247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHBvdHRlcnl8ZW58MXx8fHwxNzYzMjcyMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    hoverImage:
      "https://images.unsplash.com/photo-1762548470420-49f55dee86df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3VscHR1cmFsJTIwdmFzZXxlbnwxfHx8fDE3NjMyNzIwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 7,
    name: "Crystalline",
    description: "Pure geometric beauty",
    price: "2 100 000 soʻm",
    category: "Lighting Sculptures",
    image:
      "https://images.unsplash.com/photo-1760793957091-c92a8f9ef3a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWdodGluZyUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NjMyNzIwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hoverImage:
      "https://images.unsplash.com/photo-1655255201488-766303d720a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY2VyYW1pY3xlbnwxfHx8fDE3NjMyMjczNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 8,
    name: "Ethereal",
    description: "Floating in space",
    price: "950 000 soʻm",
    category: "Vases & Art Objects",
    image:
      "https://images.unsplash.com/photo-1658280595889-04d0d5185baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwdmFzZXN8ZW58MXx8fHwxNzYzMjcyMDk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    hoverImage:
      "https://images.unsplash.com/photo-1761330439582-c7fd39368cff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3aGl0ZSUyMHZhc2V8ZW58MXx8fHwxNzYzMjcyMDk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 9,
    name: "Zenith",
    description: "Reaching new heights",
    price: "780 000 soʻm",
    category: "Interior Accessories",
    image:
      "https://images.unsplash.com/photo-1565374235393-6fe32a07cc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc2MzI3MjA5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    hoverImage:
      "https://images.unsplash.com/photo-1762548470420-49f55dee86df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3VscHR1cmFsJTIwdmFzZXxlbnwxfHx8fDE3NjMyNzIwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Lighting Sculptures",
    image:
      "https://images.unsplash.com/photo-1760793957091-c92a8f9ef3a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaWdodGluZyUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NjMyNzIwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    name: "Vases & Art Objects",
    image:
      "https://images.unsplash.com/photo-1658280595889-04d0d5185baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwdmFzZXN8ZW58MXx8fHwxNzYzMjcyMDk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    name: "Interior Accessories",
    image:
      "https://images.unsplash.com/photo-1565374235393-6fe32a07cc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc2MzI3MjA5NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

// LocalStorage keys
const STORAGE_KEYS = {
  PRODUCTS: 'mayin_products',
  CATEGORIES: 'mayin_categories',
  HERO_SLIDES: 'mayin_heroSlides',
};

// Helper functions for localStorage
const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored) as T;
    }
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
  }
  return defaultValue;
};

const saveToStorage = <T>(key: string, data: T): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Initialize data from localStorage or use defaults
let currentProducts = loadFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, products);
let currentCategories = loadFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES, categories);
let currentHeroSlides = loadFromStorage<HeroSlide[]>(STORAGE_KEYS.HERO_SLIDES, heroSlides);

// Initialize localStorage with default data if empty (first time)
if (typeof window !== 'undefined') {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
  }
  if (!localStorage.getItem(STORAGE_KEYS.HERO_SLIDES)) {
    saveToStorage(STORAGE_KEYS.HERO_SLIDES, heroSlides);
  }
}

// Store listeners for reactive updates
let productListeners: (() => void)[] = [];
let categoryListeners: (() => void)[] = [];
let heroSlideListeners: (() => void)[] = [];

// Subscribe to changes
export const subscribeToProducts = (callback: () => void) => {
  productListeners.push(callback);
  return () => {
    productListeners = productListeners.filter(
      (listener) => listener !== callback,
    );
  };
};

export const subscribeToCategories = (callback: () => void) => {
  categoryListeners.push(callback);
  return () => {
    categoryListeners = categoryListeners.filter(
      (listener) => listener !== callback,
    );
  };
};

export const subscribeToHeroSlides = (callback: () => void) => {
  heroSlideListeners.push(callback);
  return () => {
    heroSlideListeners = heroSlideListeners.filter(
      (listener) => listener !== callback,
    );
  };
};

// Notify listeners
const notifyProductListeners = () =>
  productListeners.forEach((callback) => callback());
const notifyCategoryListeners = () =>
  categoryListeners.forEach((callback) => callback());
const notifyHeroSlideListeners = () =>
  heroSlideListeners.forEach((callback) => callback());

export const getProducts = (): Product[] => [...currentProducts];
export const getCategories = (): Category[] => [...currentCategories];
export const getHeroSlides = (): HeroSlide[] => [...currentHeroSlides];

export const updateProduct = (id: number, updates: Partial<Product>): void => {
  const index = currentProducts.findIndex((p) => p.id === id);
  if (index !== -1) {
    currentProducts[index] = { ...currentProducts[index], ...updates };
    saveToStorage(STORAGE_KEYS.PRODUCTS, currentProducts);
    notifyProductListeners();
  }
};

export const addProduct = (product: Omit<Product, "id">): void => {
  const newId = Math.max(0, ...currentProducts.map((p) => p.id)) + 1;
  currentProducts.push({ ...product, id: newId });
  saveToStorage(STORAGE_KEYS.PRODUCTS, currentProducts);
  notifyProductListeners();
};

export const deleteProduct = (id: number): void => {
  currentProducts = currentProducts.filter((p) => p.id !== id);
  saveToStorage(STORAGE_KEYS.PRODUCTS, currentProducts);
  notifyProductListeners();
};

export const updateCategory = (
  id: number,
  updates: Partial<Category>,
): void => {
  const index = currentCategories.findIndex((c) => c.id === id);
  if (index !== -1) {
    currentCategories[index] = { ...currentCategories[index], ...updates };
    saveToStorage(STORAGE_KEYS.CATEGORIES, currentCategories);
    notifyCategoryListeners();
  }
};

export const addCategory = (category: Omit<Category, "id">): void => {
  const newId = Math.max(0, ...currentCategories.map((c) => c.id)) + 1;
  currentCategories.push({ ...category, id: newId });
  saveToStorage(STORAGE_KEYS.CATEGORIES, currentCategories);
  notifyCategoryListeners();
};

export const deleteCategory = (id: number): void => {
  currentCategories = currentCategories.filter((c) => c.id !== id);
  saveToStorage(STORAGE_KEYS.CATEGORIES, currentCategories);
  notifyCategoryListeners();
};

export const updateHeroSlide = (
  id: number,
  updates: Partial<HeroSlide>,
): void => {
  const index = currentHeroSlides.findIndex((h) => h.id === id);
  if (index !== -1) {
    currentHeroSlides[index] = { ...currentHeroSlides[index], ...updates };
    saveToStorage(STORAGE_KEYS.HERO_SLIDES, currentHeroSlides);
    notifyHeroSlideListeners();
  }
};

export const addHeroSlide = (slide: Omit<HeroSlide, "id">): void => {
  const newId = Math.max(0, ...currentHeroSlides.map((h) => h.id)) + 1;
  currentHeroSlides.push({ ...slide, id: newId });
  saveToStorage(STORAGE_KEYS.HERO_SLIDES, currentHeroSlides);
  notifyHeroSlideListeners();
};

export const deleteHeroSlide = (id: number): void => {
  currentHeroSlides = currentHeroSlides.filter((h) => h.id !== id);
  saveToStorage(STORAGE_KEYS.HERO_SLIDES, currentHeroSlides);
  notifyHeroSlideListeners();
};
