import React, { createContext, useContext, useState, useEffect } from 'react';
import {getAllProductAPI} from "@/services2/operations/product"
import { v4 as uuidv4 } from "uuid"; // for generating unique ids

export interface ProductFormData {
  id?: string;
  title: string;
  slug: string;
  type: string;
  category: string[];
  mrp: number;
  sellingPrice: number;
  images: string[];
  keyBenefits: string;
  description: string;
  skinSuitability: string;
  ingredients: string[];
  howToUse: string;
  precataions?: string;
  extraInfoBlocks: Array<{
    id: string;
    image: string;
    title: string;
    content: string;
  }>;
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  orderCount: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}

interface AdminContextType {
  products: ProductFormData[];
  orders: Order[];
  users: User[];
  addProduct: (product: Omit<ProductFormData, 'id'>) => void;
  updateProduct: (id: string, product: Partial<ProductFormData>) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateUserStatus: (userId: string, status: User['status']) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

// Mock data
const mockProducts: ProductFormData[] = [
  {
    id: '1',
    title: 'Vitamin C Brightening Serum',
    slug: 'vitamin-c-brightening-serum',
    type: 'Serum',
    category: ['Anti-Aging', 'Glow Boost'],
    mrp: 1299,
    sellingPrice: 999,
    images: ['/placeholder.svg', '/placeholder.svg'],
    keyBenefits: '• Brightens skin tone\n• Reduces dark spots\n• Provides antioxidant protection\n• Improves skin texture',
    description: 'Our Vitamin C Brightening Serum is formulated with 20% Vitamin C to deliver powerful antioxidant benefits. This lightweight serum penetrates deep into the skin to brighten complexion, reduce the appearance of dark spots, and protect against environmental damage.',
    skinSuitability: 'All skin types, especially dull and uneven skin',
    ingredients: ['20% Vitamin C (L-Ascorbic Acid)', 'Hyaluronic Acid', 'Vitamin E', 'Ferulic Acid', 'Distilled Water'],
    howToUse: 'Apply 2-3 drops to clean, dry skin in the morning. Gently pat until absorbed. Follow with moisturizer and sunscreen.',
    extraInfoBlocks: [
      {
        id: 'block1',
        image: '/placeholder.svg',
        title: 'Clinical Results',
        content: 'In clinical studies, 95% of users saw visible improvement in skin brightness within 4 weeks of regular use.'
      }
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'Can I use this serum with other skincare products?',
        answer: 'Yes, this serum works well with most skincare products. Apply it before moisturizer and always use sunscreen during the day.'
      },
      {
        id: 'faq2',
        question: 'How long does one bottle last?',
        answer: 'With regular use (once daily), one 30ml bottle typically lasts 2-3 months.'
      }
    ]
  },
  {
    id: '2',
    title: 'Niacinamide Pore Refining Serum',
    slug: 'niacinamide-pore-refining-serum',
    type: 'Serum',
    category: ['Acne Care', 'Oily Skin'],
    mrp: 899,
    sellingPrice: 699,
    images: ['/placeholder.svg', '/placeholder.svg'],
    keyBenefits: '• Minimizes pore appearance\n• Controls oil production\n• Reduces blemishes\n• Improves skin texture',
    description: 'This 10% Niacinamide serum helps control excess oil production while minimizing the appearance of pores. Perfect for oily and acne-prone skin types.',
    skinSuitability: 'Oily, combination, and acne-prone skin',
    ingredients: ['10% Niacinamide', 'Zinc PCA', 'Hyaluronic Acid', 'Panthenol (Pro-Vitamin B5)'],
    howToUse: 'Apply 2-3 drops to clean skin twice daily. Can be used morning and evening.',
    extraInfoBlocks: [
      {
        id: 'block1',
        image: '/placeholder.svg',
        title: 'Oil Control Technology',
        content: 'Our advanced formula helps regulate sebum production for a balanced, shine-free complexion.'
      }
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'Is this suitable for sensitive skin?',
        answer: 'While generally well-tolerated, we recommend patch testing first if you have sensitive skin.'
      }
    ]
  }
];

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    userId: 'user1',
    customerName: 'Priya Sharma',
    customerEmail: 'priya@example.com',
    items: [
      { productId: '1', productName: 'Vitamin C Brightening Serum', quantity: 1, price: 999 },
      { productId: '2', productName: 'Niacinamide Pore Refining Serum', quantity: 1, price: 699 }
    ],
    total: 1698,
    status: 'processing',
    createdAt: '2024-01-15T10:30:00Z',
    shippingAddress: {
      street: '123 Green Park',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110016',
      phone: '+91 9876543210'
    }
  },
  {
    id: 'ORD002',
    userId: 'user2',
    customerName: 'Ananya Gupta',
    customerEmail: 'ananya@example.com',
    items: [
      { productId: '1', productName: 'Vitamin C Brightening Serum', quantity: 2, price: 999 }
    ],
    total: 1998,
    status: 'shipped',
    createdAt: '2024-01-14T15:20:00Z',
    shippingAddress: {
      street: '45 Brigade Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      phone: '+91 8765432109'
    }
  }
];

const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 9876543210',
    joinedAt: '2023-12-01T00:00:00Z',
    orderCount: 3,
    totalSpent: 4500,
    status: 'active'
  },
  {
    id: 'user2',
    name: 'Ananya Gupta',
    email: 'ananya@example.com',
    phone: '+91 8765432109',
    joinedAt: '2023-11-15T00:00:00Z',
    orderCount: 5,
    totalSpent: 7200,
    status: 'active'
  },
  {
    id: 'user3',
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    phone: '+91 7654321098',
    joinedAt: '2023-10-20T00:00:00Z',
    orderCount: 1,
    totalSpent: 999,
    status: 'inactive'
  }
];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load from localStorage or use mock data
    
    const savedOrders = localStorage.getItem('admin-orders');
    const savedUsers = localStorage.getItem('admin-users');

   

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders(mockOrders);
    }

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers(mockUsers);
    }
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProductAPI(); // this should return raw products array

        const transformed = response.map((item) => ({
          id: item._id,
          title: item.title,
          slug: item.slug,
          type: item.type,
          category: item.category,
          mrp: item.mrp,
          sellingPrice: item.sellingPrice,
          images: item.images,
          keyBenefits: item.keyBenefits,
          description: item.description,
          skinSuitability: item.skinSuitability,
          ingredients: item.ingredients,
          howToUse: item.howToUse,
          precataions: item.precataions,
          extraInfoBlocks: item.extraInfoBlocks?.map((block) => ({
            id: block?._id ||uuidv4(),
            image: block.image,
            title: block.title,
            content: block.content,
          })) ?? [],
          faqs: item.faqs?.map((faq) => ({
            id: faq?._id || uuidv4(),
            question: faq.question,
            answer: faq.answer,
          })) ?? [],
        }));

        setProducts(transformed);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  const addProduct = (product: Omit<ProductFormData, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, productData: Partial<ProductFormData>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productData } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const updateUserStatus = (userId: string, status: User['status']) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
  };

  const value: AdminContextType = {
    products,
    orders,
    users,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateUserStatus
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};