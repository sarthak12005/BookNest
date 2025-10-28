import axiosInstance from "./axiosInstance";


export const fetchBooks = async () => {
    try {
        const response = await axiosInstance.get('/books/books');
        return response.data;
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


