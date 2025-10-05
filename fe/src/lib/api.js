import axiosInstance from "./axiosInstance";


export const fetchBooks = async (params) => {
    try {
        const response = await axiosInstance.get('/books/books');
        return response.data;
    } catch (error) {
        console.error("Error fetching books:", error);
    }
};


