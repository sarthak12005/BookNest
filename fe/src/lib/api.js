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

export const fetchBooks = async () => {
  try {
    const response = await axiosInstance.get('/book/books');
    if (!response.data) {
      return [];
    }
    const books = response.data;
    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
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

export const fetchCategory = async () => {
  try {
    const res = await axiosInstance.get('/category?page=1&limit=5');

    if (!res.data.data) {
      return [];
    }
    return res.data.data.data;
  } catch (error) {
    console.log('Error in fetching categories');
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
    return res?.data?.data?.data || null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
