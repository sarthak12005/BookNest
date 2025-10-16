import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const userContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const token = localStorage.getItem('token');
    //             const res = await axios.get(`${API_URL}/auth/me`, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             });

    //             if (res.status === 200) {
    //                 setUser(res.data.user);
    //             }
    //         } catch (error) {
    //             console.error('error in fetching user', error);
    //             setUser(null);
    //         }
    //     }

    //     fetchUser();
    // },[]);

    return (
        <userContext.Provider value={{ user }}>
            {children}
        </userContext.Provider>
    )
};


const useUser = () => {
    const context = useContext(userContext);
    return context;
};


export { useUser, UserProvider };






