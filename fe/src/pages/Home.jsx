import { useState, useEffect } from "react"
import { useUser } from "../context/useUser";
import { useNavigate } from 'react-router';
import { fetchBooks } from "../lib/api";
import { RefreshCcwDotIcon, TruckIcon } from "lucide-react";
import { motion } from 'framer-motion'
import FloatingGrid from "../components/Home/FramerGrid";


const Home = () => {
  const { user } = useUser();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/auth');
    }
  }, [user, navigate]);

  useEffect(() => {
    const loadBooks = async () => {
      const books = await fetchBooks(); // Wait for the Promise to resolve
      setBooks(books);
    };
    loadBooks(); // Call the async function
  }, []);


  return (
    <>
      <section className="h-screen max-w-screen">
        <div className="h-[80%] bg-gradient-to-br from-[#d4e6fa] to-[white] flex gap-2 justify-center">
          <div className="w-[600px]  flex  justify-center flex-col px-5 gap-4">
            <div>
              <h1 className="text-6xl font-bold">Find Your next <span className="text-blue-400">favorite</span> book</h1>
            </div>
            <div>
              <p className="text-gray-600 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quod vitae eligendi minus iste nostrum?</p>
            </div>
            <div className="button flex gap-2">
              <button className="bg-yellow-500 px-5 py-3 rounded-[17px] text-white font-semibold">Shop Bestsellers</button>
              <button className="bg-transperent px-5 py-3 rounded-[17px] text-blue-500 border-2 border-blue-400 hover:bg-blue-400 hover:text-white font-semibold ">Browse Categories</button>
            </div>
            <div className="flex gap-2">
              <p className="flex gap-1 items-center"><span className="text-green-500"><TruckIcon size={18} /></span>Free Shipping over ₹999</p>
              <p className="flex gap-1 items-center"><span className="text-green-500"><RefreshCcwDotIcon size={18} /></span>Free Shipping over ₹999</p>
            </div>
          </div>
          <div className="w-[600px] h-full bg-blue-200 relative ">
            <FloatingGrid />
          </div>
        </div>
        <div className="h-[20%] bg-[#c9e0fb]">

        </div>
      </section>
    </>
  )
}

export default Home
