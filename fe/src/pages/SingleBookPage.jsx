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

// const BOOK_DATA = {
//   id: "atomic-habits",
//   title: "Atomic Habits",
//   author: { name: "James Clear", bio: "James Clear is an author and speaker focused on habits, decision-making, and continuous improvement.", href: "#" },
//   rating: 4.8,
//   reviewCount: 12430,
//   price: 499,
//   originalPrice: 699,
//   discount: 28,
//   badges: ["Bestseller"],
//   description:
//     "Atomic Habits will reshape the way you think about progress and success, and give you the tools and strategies you need to transform your habits—whether you are a team looking to win a championship, an organization hoping to redefine an industry, or simply an individual who wishes to quit smoking, lose weight, reduce stress, or achieve any other goal.",
//   specs: [
//     { label: "Publisher", value: "Penguin Random House" },
//     { label: "Language", value: "English" },
//     { label: "Pages", value: "320 pages" },
//     { label: "ISBN-10", value: "1847941834" },
//   ],
//   images: [
//     "https://lh3.googleusercontent.com/aida-public/AB6AXuBUCvJxfr8j672-Zm0bzh4sw7CjpDEJ--YPoGK2iprv8AUc0R1a0pHQ3h0ZgTB8Ug3DLudJFB8ZEQEr1BzZS_fyCUUsuGAVPRqpeglFRKf44cABOT_tLI69q2_qMv-pGhU00Nk-hoguTYJyZIx3T-3UGYV3Ljl-xgca7Kj8Eg7JU5xPKWwhn7XbzVH8dmgpXwvJ-NZF7UBycGCZ2lFHma-TXEs_EnAGYnnIqDNsWs1oV7rob2bf5O6h-l7gmF5HrBrfiWf4_WGUmjE",
//     "https://lh3.googleusercontent.com/aida-public/AB6AXuCdogtzeBrJO388jxuLuhsd37IVoNHHb2bFFc-aHbQFAW6Ccwho7zm9RDIDKCLUqaitFLnns-T-7slSiP929mYk7zQFVwtWiL023fHqk9-41MC1fKNYJ8_6oJne-jujUsSq7WirRltd_a9osZCuU15QtFriluPFkq02v72VaUO3dX4-UVwRPudIP7FS75-qpc1O18hbm1Xw6KvQQ6FCLpbUlTvbd3i31I2dSTdootBARBK95KHXvnT1le0k27bdIvMzUHPHOUzLfIw",
//     "https://lh3.googleusercontent.com/aida-public/AB6AXuBdPx8w5J6u6m6_cLh44TQMGlv45HoQCV5aaczP09RtG4gEK49G3gmgJyVX9fMHLDOf2d6KW0VUJTWvPAe95O30-I4desUihN9awwp2_9AKi7XBld-2EbD0h87evfr63Xz-Gojf6weyn_96Y1sHqSzDXod8--q9Sou4WPFRetDtDkB_c8hnuhLlZlwLOjjMptM6IPhh4jiv1tfHzVabm8VaTdtgyx6V8G4o4s7QWtoK0hIebtLVcDqzGNl5NkY",
//     "https://lh3.googleusercontent.com/aida-public/AB6AXuDrFCvu7ohsGt-N9TAR6k--MgSDE0Ds0QnpNv1sBBGMI20Y249GW23KgW4CmI9GWBn2poOJsN5UzChlAl6Kc9NJ6jIUAgvJlx-MuGqVoEFv2cAimPTOjQLl00E_V6N6DbMMcNyAzVMjcO651w8f1McSB8xH6T8xuhZ1Lllhp13GHfXMJnh8dBAGs5aCnKa9DoYMMPB4w7gXcP37lCCZab8usZoaHqginBIgNgwp8iOXy9KtR2J73uOnzGzVWB6nLl8ytBQJh0sYJnE",
//   ],
//   authorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsDrY2cXnvEe81sAomhoZvn8QtWZKllDGpA5VFstqIbSUp3ndvb10VP_BoNg4nPAVwn6g0d9dzlSdExO7PMu2WAfmyUbi5kbztt656nUWs8foNwUHgGuCXwyT4FKkUfJpstqZGjT0j1y1XbXid4uOsRRE_bLqpKM0jw2LtB-fXkspGD5gYvDdvxe4QL8mNTxFZJurcWqpFftNKm7xUv0zhHgRFH4Z-S5nWfFAPwnNjerTuIQMslWfltZsISJJa3uPe7geq6eNK4dQ",
//   ratingBreakdown: [
//     { stars: 5, pct: 85 },
//     { stars: 4, pct: 10 },
//     { stars: 3, pct: 3 },
//     { stars: 2, pct: 1 },
//     { stars: 1, pct: 1 },
//   ],
//   reviews: [
//     {
//       id: 1,
//       name: "John Doe",
//       initials: "JD",
//       color: "bg-blue-100 text-blue-700",
//       rating: 5,
//       date: "Oct 12, 2023",
//       verified: true,
//       text: "Life changing book. The systems-based approach to habits is much more effective than relying on willpower alone. Clear's writing is concise and actionable.",
//     },
//     {
//       id: 2,
//       name: "Sarah Ahmed",
//       initials: "SA",
//       color: "bg-purple-100 text-purple-700",
//       rating: 5,
//       date: "Sep 28, 2023",
//       verified: true,
//       text: "The best book on habits I've ever read. It takes complex scientific concepts and makes them easy to apply. Highly recommended for anyone looking to improve.",
//     },
//   ],
//   bundle: {
//     totalPrice: 1299,
//     savings: 198,
//     books: [
//       {
//         title: "Atomic Habits",
//         img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgrLc9smyMQcEcYfBx6Sso1DF_YHn407jjRYukjMvuPVXtXjAumhALfOYSRTOTX-hmAnuKwK6wGIiZo0Op33TZdTBIN1zsUNkk6CKwpLqDgo1FztWdKC2UbRddFT-F93JFjhg-fGSc_xsOqdskNUUKDLimOr8Rv9O6iyqbErKiyNMNixXxC8q4VCbe8HCSiiIzDLHYXNVW1IQaf0NcTiTkEU3Jw7N1faPSnnXGkWXXEImxqZcOklWfpzfRxlfKK5st0r_VRc7T_lg",
//       },
//       {
//         title: "Deep Work",
//         img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDapr7oOGjJiZPREDBWXGYh7yjanLMND1vanNdH8GzTe1AwIFAQPZ6esANuuI1T1PQObjaQfmarRmYqQXvGZ_by9uNJIJuMdW2AYuczE_RWBYRhRYO9FNrhGJgsxoRQFUchcegOCY9A8vrOA6JdGn7-RoFaG4zQSHXlQNrvPj0foDhPqr2mCNuivEPMEc2VzWvTfJnRjoGCo-V0ZKso5vDlF05KgkXm4eyXk0v1sTVhNMl6j_MAbN_gRUHVh0EimGNfO2ktTYL7ydE",
//       },
//       {
//         title: "Psychology of Money",
//         img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMPzDBPtjJkO__LoAYN5B057e6yK6a9Y_RN2SgFBtsc3gIkzAjlLQnPQMQ1pJIA7ntC2K9K1h5oR98Gy6HjbQNNuotM0GzBb5Ql5xhfajwGV9ZhrpZgNiQZ29YojJp_fYbvNeRBE6d0fcl8AAppQviZaHeEFpncengNxsSVzPT8mJv5jyAKBrLBJ8wN-FJ22658zJObRFGGw7YjUQtYOCLpvUpTsTo_RxFeDdR9RxVVihwwTpZ1pHGrG2ERN-qZduHWNtFRpCB9iU",
//       },
//     ],
//   },
//   relatedBooks: [
//     { title: "Deep Work", author: "Cal Newport", price: 399, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAd4wMsbuz-YC8rgnDTq3qvFEZRF9C4mkO9vePt002a1al99PxC1QE637x_MBqaWnB6JlB25-LKy5QKp3FH_pc7r9d8sQOrZm445Yzgzuxl20FnIZ6AQXmGGjPH7_o6lox_n6ILK47lVNXtNnhTDB5FUBq9kJ3N9YJ-LDWmkaUgLgnJXuJkTI-pPn6FRcWurFnGgQg6xnaGMEfHGeYWkBFVx6P-aFb1zqIWNMev1ldcW_nx2db7bqnszPyh0LPvmkj_r2HpjCq2iUc" },
//     { title: "The 5 AM Club", author: "Robin Sharma", price: 450, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPSNDx7PmvJB9sNH-tgL8Md3p6gBS5wPKrJJoOQTwkRH2FyCa9EWlF88GtSWG0vwBbpwyd_J7_tUmMcv4h8nmbVt-gAWZVGE-9WGlfN92D2cZD-f_A6FnPaTeIgIM_hb-FbpzJtn0pwq7Q31rlqyH-6IIywQ_ACPuYsMDXqXKSQQEHIdKrTSvizyeUffmNRcB0mJ3EgFfeT5bewO7_ENvbqH09-dzRLio4vBPox4e9Sk6CT4Aiy6KVczdKxeyBqKh9DeGfdvuk5XM" },
//     { title: "Psychology of Money", author: "Morgan Housel", price: 320, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsSWXZXz9V4dxhuvJKQKkTGE8ZjVnwUSpqGJ8qTqb9FWIZad5aa3KhSult5NuYnQpWdw8cP8FmgEuLm2u2jxmi9rLKNzzQqJLo0mM3Ad9DKcPhOwnLcmQ2cZ16mwvWdiQn-BElNBXG0lHVu5s7A0C2PEaxHqncXHlGSwx-YwEbRCSKNSqK0sSNPyNx2oIU87Tl27f_nNIaEEphdfF8AAMdSacKRGfbkOvtLLSooxyoQEuvHGvK4WMNuSIcQbXcINidYzQUQ9l-N1E" },
//     { title: "Essentialism", author: "Greg McKeown", price: 425, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC04BCmQuOIOo_iaqJVLRzMCOFiad9L7EeIQlNY5ccGieZoS58D1e3pKAT2BKSU_dRH0F7EFMx8wOvdaIhATS_XQO87tdj-aCmyiQK-iikKmxleumV30-gsojhvnXZUHr3DOjhHIdM3A8FT-9L_Ii0eHsNPA7uLDN6yrmf2uOZzFwt23n1zVb1rMHfNg0-6RgsvV20_W2824QHrkJwlbPZDp0QrieSRUUy15cYWsEhRKpjNQBd_AP3RC5xvGJMbpzKvbLcSwVb1xq4" },
//     { title: "Start With Why", author: "Simon Sinek", price: 480, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpV6vT6_9Dql85lrvweYJ2W32d2dHOsZ1xPg85hs6Z0hPvjnpNVmayU1jo_AbHMSv8DQdoiymvG6Fgnm_li3oG8iFv4vy7Miv84e22d2oxRZSnGOL1dUD9_tGffzA4rSSYBgZ3TT7KHlIwGkwG8onIG3yh9_izXe7NcrPiLMdikyHWU-sIxOGsV4YJ4NzYxyhI_gKt94nVeHwvJ2rmhJ5QizGXKV4u6yCjY_ZgzHPz0yggy1fnYkDf7GBYcdQkf2ZdtENnQWs7BYs" },
//   ],
//   breadcrumbs: [
//     { label: "Home", href: "#" },
//     { label: "Categories", href: "#" },
//     { label: "Self Improvement", href: "#" },
//   ],
// };

const SingleBookPage = () => {

  // =========================
  // GET BOOK ID FROM URL
  // =========================
  const { bookId: id } = useParams();

  // =========================
  // STATES
  // =========================
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

  // =========================
  // API CALL
  // =========================
  useEffect(() => {

    if (id) {
      fetchSingleBook(id);
    }

  }, [id]);

  // =========================
  // LOADING UI
  // =========================
  if (loading) {

    return <BookPageSkeleton/>;

  }

  // =========================
  // ERROR UI
  // =========================
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

  // =========================
  // MAIN UI
  // =========================
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