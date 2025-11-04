import { useState, useEffect } from "react"
import { useUser } from "../context/useUser";
import { useNavigate } from 'react-router';
import { fetchBooks } from "../lib/api";


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
       <section className="h-screen">
           <div className="h-[80%] bg-gradient-to-br from-[#d4e6fa] to-[white]"></div>
           <div className="h-[20%] bg-[#c9e0fb]"></div>
       </section>
    </>
  )
}

export default Home
