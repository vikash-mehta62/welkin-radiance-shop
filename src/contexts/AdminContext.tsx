
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllProductAPI } from "@/services2/operations/product";
import { getAllOrderAPI, updateOrderStatusAPI } from "@/services2/operations/order";
import { getAllUsersAPI, updateUserStatusAPI } from "@/services2/operations/auth";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

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
  categories: string[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<ProductFormData, 'id'>) => void;
  updateProduct: (id: string, product: Partial<ProductFormData>) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateUserStatus: (userId: string, status: User['status']) => void;
  refreshData: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { token } = useSelector((state: RootState) => state.auth);

  // Extract unique categories from products
  const extractCategories = (productList: ProductFormData[]) => {
    const allCategories = productList.flatMap(product => product.category);
    return [...new Set(allCategories)].filter(Boolean);
  };

  // Fetch all data
  const fetchAllData = async () => {
    if (!token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch products
      const productsResponse = await getAllProductAPI();
      const transformedProducts = productsResponse.map((item: any) => ({
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
        extraInfoBlocks: item.extraInfoBlocks?.map((block: any) => ({
          id: block?._id || uuidv4(),
          image: block.image,
          title: block.title,
          content: block.content,
        })) ?? [],
        faqs: item.faqs?.map((faq: any) => ({
          id: faq?._id || uuidv4(),
          question: faq.question,
          answer: faq.answer,
        })) ?? [],
      }));
      
      setProducts(transformedProducts);
      setCategories(extractCategories(transformedProducts));

      // Fetch orders
      try {
        const ordersResponse = await getAllOrderAPI(token);
        const transformedOrders = ordersResponse.map((order: any) => ({
          id: order._id,
          userId: order.user?._id || order.userId,
          customerName: order.user?.name || 'Unknown Customer',
          customerEmail: order.user?.email || 'No email',
          items: order.orderItems?.map((item: any) => ({
            productId: item.product?._id || item.productId,
            productName: item.product?.title || 'Unknown Product',
            quantity: item.quantity,
            price: item.product?.sellingPrice || 0
          })) || [],
          total: order.totalPrice || 0,
          status: order.orderStatus || 'pending',
          createdAt: order.createdAt,
          shippingAddress: {
            street: order.shippingInfo?.street || '',
            city: order.shippingInfo?.city || '',
            state: order.shippingInfo?.state || '',
            pincode: order.shippingInfo?.pincode || '',
            phone: order.user?.phone || ''
          }
        }));
        setOrders(transformedOrders);
      } catch (orderError) {
        console.error('Error fetching orders:', orderError);
        setOrders([]);
      }

      // Fetch users
      try {
        const usersResponse = await getAllUsersAPI(token);
        const transformedUsers = usersResponse.map((user: any) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          joinedAt: user.createdAt,
          orderCount: user.orderCount || 0,
          totalSpent: user.totalSpent || 0,
          status: user.status || 'active'
        }));
        setUsers(transformedUsers);
      } catch (userError) {
        console.error('Error fetching users:', userError);
        setUsers([]);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [token]);

  const addProduct = (product: Omit<ProductFormData, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
    setCategories(extractCategories([...products, newProduct]));
  };

  const updateProduct = (id: string, productData: Partial<ProductFormData>) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...productData } : p);
      setCategories(extractCategories(updated));
      return updated;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => {
      const filtered = prev.filter(p => p.id !== id);
      setCategories(extractCategories(filtered));
      return filtered;
    });
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      if (token) {
        await updateOrderStatusAPI(orderId, status, token);
      }
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const updateUserStatus = async (userId: string, status: User['status']) => {
    try {
      if (token) {
        await updateUserStatusAPI(userId, status, token);
      }
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const refreshData = () => {
    fetchAllData();
  };

  const value: AdminContextType = {
    products,
    orders,
    users,
    categories,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateUserStatus,
    refreshData
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
