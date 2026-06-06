import { useEffect, useState } from "react";
import BuyCard from "../components/books_id/BuyCard";
import ImageGallery from "../components/books_id/ImageGallery";
import BookDetails from "../components/books_id/BookDetails";
import ReviewsSection from "../components/books_id/ReviewsSection";
import RelatedBooks from "../components/books_id/RelatedBooks";
import BundleSection from "../components/books_id/BundleSection";
import { useParams } from "react-router-dom";
import { fetchSingleBookById } from "../lib/api";
import BookPageSkeleton from "../components/books_id/skeletons/BookSkeleton";


const SingleBookPage = () => {
  const { bookId: id } = useParams();

  const [book, setBook] = useState({});

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [descExpanded, setDescExpanded] = useState(false);

  // =========================
  // FETCH SINGLE BOOK
  // =========================
  const fetchSingleBook = async (id) => {

    try {
      setLoading(true);
      const book = await fetchSingleBookById(id);
      setBook(book);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
        "Failed to fetch book"
      );
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {

    if (id) {
      fetchSingleBook(id);
    }

  }, [id]);

  if (loading) {

    return <BookPageSkeleton/>;

  }


  if (error) {

    return (

      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-red-500 font-semibold">
          {error}
        </h1>
      </div>

    );

  }

  if (!book) {

    return (

      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-lg font-semibold">
          Book not found
        </h1>
      </div>

    );

  }

  return (

    <div className="bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">

      <main className="max-w-screen-xl mx-auto px-6 md:px-16 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <ImageGallery
            images={book?.coverImages}
            title={book?.title}
            price={book?.price}
            discountPrice={book?.discountPrice}
            heart={book?.wishlisted}
          />

          <BookDetails
            book={book}
            descExpanded={descExpanded}
            onExpandDesc={() => setDescExpanded((v) => !v)}
          />

          <BuyCard
            book={book}
          />

        </div>

        <BundleSection
          bundle={false}
        />

        <ReviewsSection
          book={book}
        />

        <RelatedBooks
          books={book?.relatedBooks || []}
        />

      </main>

    </div>

  );

};

export default SingleBookPage;