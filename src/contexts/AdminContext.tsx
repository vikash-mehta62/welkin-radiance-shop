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
  view?: number;
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
console.log(response)
        const transformed = response.map((item) => ({
          id: item._id,
          _id: item._id,
          view: item.productView ,
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