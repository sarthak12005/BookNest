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
      <h1>Hello Home</h1>
      <div>
        {/* {books.map((b) => (
          <div key={b._id}>
            {b.title} || {b.author}
          </div>
        ))} */}
      </div>
    </>
  )
}

export default Home
