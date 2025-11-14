import axiosInstance from "./axiosInstance";
import toast from 'react-hot-toast'



export const fetchUser = async () => {
    try {
        const res = await axiosInstance.get('/auth/me');

        if (res.status === 200) {
            return res.data.user;
        }

    } catch (error) {
        console.log("error in fetch User :", error);
        return error;
    }
}

export const loginUser = async (loginData, navigate) => {
    try {
        const { email, password } = loginData;

        const res = await axios.post(`${API_URL}/auth/login`, {
            email,
            password
        });

        if (res.status === 200) {
            toast.success("login Successfully");
            localStorage.setItem('token', res.data.token);
            navigate('/');
        }

    } catch (error) {
        console.error('Login error:', error);
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
    }
}

export const fetchBooks = async () => {
    try {
        const response = await axiosInstance.get('/book/books');
        const books = response.data;
        return books;
    } catch (error) {
        console.error("Error fetching books:", error);
    }
};

export const addBook = async (data) => {
    try {
        const res = await axiosInstance.post('/book/book', data);

        if (res.status === 200) {
             toast.success("Book Added Successfully!");
        }

    } catch (error) {
        console.log("error in adding book ", error);
        toast.error("Error in adding book");
    }
}

export const fetchCategory = async () => {
    try {
        const res = await axiosInstance.get('/category/category');
        return res.data.categories;
    } catch (error) {
        console.log("Error in fetching categories");
    }
}


