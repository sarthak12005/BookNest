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
    const books = fetchBooks();
    setBooks(books);
  },[user, navigate]);

 

  


  return (
    <>
        <h1>Hello Home</h1>
    </>
  )
}

export default Home
