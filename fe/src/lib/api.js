import axiosInstance from "./axiosInstance";
import toast from 'react-hot-toast'





export const fetchBooks = async () => {
    try {
        const response = await axiosInstance.get('/book/books');
        const books = response.data;
        return books;
    } catch (error) {
        console.error("Error fetching books:", error);

    }
};

export const addBooks = async (data) => {
    try {

    } catch (error) {

    }
}

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


