import axios from 'axios';
import axiosInstance from './axiosInstance';
import toast from 'react-hot-toast';

export const fetchUser = async () => {
  try {
    const res = await axiosInstance.get('/auth/me');

    if (res.status === 200) {
      return res.data.user;
    }
  } catch (error) {
    console.log('error in fetch User :', error);
    return error;
  }
};

export const loginUser = async (loginData, navigate) => {
  try {
    const { email, password } = loginData;

    const res = await axios.post(
      `${API_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    if (res.status === 200) {
      toast.success('login Successfully');
      navigate('/');
    }
  } catch (error) {
    console.error('Login error:', error);
    toast.error(error.response?.data?.message || 'Login failed. Please try again.');
  }
};

export const fetchBooks = async (filters = {}) => {
  try {
    const params = {};
    if (filters.page) params.page = String(filters.page);
    if (filters.limit) params.limit = String(filters.limit);
    if (filters.search) params.search = String(filters.search);
    if (filters.category) params.category = String(filters.category);
    if (filters.minPrice !== undefined) params.minPrice = String(filters.minPrice);
    if (filters.maxPrice !== undefined) params.maxPrice = String(filters.maxPrice);
    if (filters.minRating !== undefined) params.minRating = String(filters.minRating);
    if (filters.inStock !== undefined) params.inStock = String(filters.inStock);
    if (filters.sortBy) params.sortBy = String(filters.sortBy);
    if (filters.sortOrder) params.sortOrder = String(filters.sortOrder);

    const response = await axiosInstance.get('/books', { params });
    
    return {
      books: response.data?.data || [],
      pagination: response.data?.pagination || {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false
      }
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    return {
      books: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false
      }
    };
  }
};

export const addBook = async (data) => {
  try {
    const res = await axiosInstance.post('/book/book', data);

    if (res.status === 200) {
      toast.success('Book Added Successfully!');
    }
  } catch (error) {
    console.log('error in adding book ', error);
    toast.error('Error in adding book');
  }
};

export const fetchCategory = async (page = 1, limit = 100) => {
  try {
    const res = await axiosInstance.get(`/category?page=${page}&limit=${limit}`);

    if (!res.data.data) {
      return [];
    }
    return res.data.data;
  } catch (error) {
    console.log('Error in fetching categories:', error);
    return [];
  }
};

export const fetchBestsellingBooks = async (type = 'bestselling') => {
  const res = await axiosInstance.get('/books');
  if (!res.data.data) {
    toast.error('failed to fetch books');
    return [];
  }

  return res.data.data;
};

export const logout = async () => {
  try {
    const res = await axiosInstance.post('/auth/logout');
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addToWishList = async (bookId) => {
  try {
    const res = await axiosInstance.patch(`/users/wishlist/${bookId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchWishlist = async () => {
  try {
    const res = await axiosInstance.get('/users/wishlist');
    return res.data?.data || [];
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return [];
  }
};

export const fetchProfile = async () => {
  try {
    const res = await axiosInstance.get('/users/profile');
    return res.data?.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const res = await axiosInstance.patch('/users/profile', profileData);
    if (res.status === 200) {
      toast.success('Profile updated successfully!');
      return res.data?.data;
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    toast.error(error.response?.data?.message || 'Failed to update profile');
    throw error;
  }
};


export const fetchNewArrivals = async () => {
  try {
    const res = await axiosInstance.get(`/books/new-arrivals?limit=${10}`);
    if (!res.status === 200) throw new Error('Failed to fetch');
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleBookById = async (id) => {
  try {
    const res = await axiosInstance.get(`/books/${id}`);
    return res?.data?.data || null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    const res = await axiosInstance.post('/carts', { productId, quantity });
    if (res.status === 200 || res.status === 201) {
      toast.success('Added to Cart!');
      return res.data;
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error(error.response?.data?.message || 'Failed to add to cart');
    throw error;
  }
};
