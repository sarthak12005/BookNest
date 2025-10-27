import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return; // Don't bother fetching if no token

            try {
                const res = await axios.get(`${API_URL}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.status === 200) {
                    setUser(res.data.user);
                }
            } catch (error) {
                console.error('Error fetching user', error);
                setUser(null);
            }
        }

        fetchUser();
    }, []); 

    return (
       
        <UserContext.Provider value={{ user }}> 
            {children}
        </UserContext.Provider>
    )
};


const useUser = () => {
    const context = useContext(UserContext);
    return context;
};

export { useUser, UserProvider };