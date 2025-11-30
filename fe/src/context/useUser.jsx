import { useState, useEffect, createContext, useContext } from "react";
import axiosInstance from "../lib/axiosInstance";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return; // Don't bother fetching if no token

            try {
                const res = await axiosInstance.get(`/auth/me`);

                if (res.status === 200) {
                    setUser(res.data.user);
                }
                
            } catch (error) {
                console.error('Error fetching user', error);
                if (error?.status === 429) {
                    toast.error("too many request");
                }
                setUser(null);
                navigate('/auth');
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