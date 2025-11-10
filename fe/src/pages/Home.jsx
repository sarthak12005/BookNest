import { useState, useEffect } from "react"
import { useUser } from "../context/useUser";
import { useNavigate } from 'react-router';
import { fetchBooks } from "../lib/api";
import HeroSection from "../components/Home/HeroSection";
import CategorySection from "../components/Home/CategorySection";

const Categories = [
  {
    bg_image: "https://images.unsplash.com/photo-1544939200-1bf6c6cbc3f4?q=80&w=1080",
    title: "Fiction",
    subTitle: "Immerse yourself in captivating stories"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1080",
    title: "Non-Fiction",
    subTitle: "Expand your knowledge and understanding"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=1080",
    title: "Self-Help",
    subTitle: "Transform your life with expert guidance"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1517511620798-cec17d428bc0?q=80&w=1080",
    title: "Tech & Coding",
    subTitle: "Master the digital world"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1080",
    title: "Romance",
    subTitle: "Fall in love with heartwarming tales"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1467951591042-f38837654a05?q=80&w=1080",
    title: "Thriller",
    subTitle: "Experience suspense and adrenaline"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1080",
    title: "Mystery",
    subTitle: "Unravel twists and secrets"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1080",
    title: "Science Fiction",
    subTitle: "Explore futuristic worlds and beyond"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?q=80&w=1080",
    title: "Fantasy",
    subTitle: "Enter magical realms and legends"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1457694587812-e8bf29a43845?q=80&w=1080",
    title: "Biography",
    subTitle: "Discover inspiring life stories"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1080",
    title: "History",
    subTitle: "Travel through time with rich narratives"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1453747063559-36695c8771d5?q=80&w=1080",
    title: "Education",
    subTitle: "Strengthen your learning journey"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1515165562835-c4c9e2f1f0bb?q=80&w=1080",
    title: "Business",
    subTitle: "Build strategies and succeed"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1080",
    title: "Psychology",
    subTitle: "Understand the mind and behavior"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1517430816045-df4b7de1cd0e?q=80&w=1080",
    title: "Health & Fitness",
    subTitle: "Improve your physical well-being"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1508182311256-e3f7d7e0e8c8?q=80&w=1080",
    title: "Cooking",
    subTitle: "Discover cuisines from around the world"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1529107386315-38fefabbc89f?q=80&w=1080",
    title: "Art & Photography",
    subTitle: "Fuel your creative inspiration"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1080",
    title: "Travel",
    subTitle: "Explore destinations across the globe"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1080",
    title: "Children's Books",
    subTitle: "Delightful stories for young minds"
  },
  {
    bg_image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1080",
    title: "Poetry",
    subTitle: "Feel emotions through beautiful verses"
  }
]



const Home = () => {
  const { user } = useUser();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      const books = await fetchBooks(); // Wait for the Promise to resolve
      setBooks(books);
    };
    loadBooks(); // Call the async function
  }, []);


  return (
    <div>
       <HeroSection/>
       <CategorySection categories={Categories}/>
    </div>
  )
}

export default Home
