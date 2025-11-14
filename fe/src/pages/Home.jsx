import { useState, useEffect } from "react"
import { useUser } from "../context/useUser";
import { useNavigate } from 'react-router';
import { fetchBooks, fetchCategory } from "../lib/api";
import HeroSection from "../components/Home/HeroSection";
import CategorySection from "../components/Home/CategorySection";


const Home = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoading = async () => {
      try {
        setLoading(true)
        await loadCategory();
        await loadBooks();
      } catch (error) {

      } finally {
         setLoading(false);
      }
    }

    fetchLoading()
  }, []);


  const loadBooks = async () => {
    const books = await fetchBooks(); // Wait for the Promise to resolve
    setBooks(books);
  };

  const loadCategory = async () => {
    const categories = await fetchCategory();
    setCategories(categories);
  }

  if (loading) {
     return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="border-t-2 border-l-2 border-red-600 animate-spin w-14 h-14 rounded-full">
            </div>
        </div>
     )
  }

  return (
    <div>
      <HeroSection />
      <CategorySection categories={categories} />
    </div>
  )
}

export default Home
