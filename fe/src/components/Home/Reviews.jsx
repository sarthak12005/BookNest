import { useState, useEffect } from "react";

const DUMMY_REVIEWS = [
  {
    _id: "1",
    rating: 5,
    review: '"Skylit Books has become my go-to for discovering amazing reads. Their curated selection never disappoints, and the delivery is always prompt!"',
    name: "Sarah Johnson",
    label: "Verified Buyer",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    _id: "2",
    rating: 5,
    review: '"The website is so easy to navigate, and I love the personalized recommendations. Found my new favorite author through their suggestions!"',
    name: "Michael Chen",
    label: "Verified Buyer",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    _id: "3",
    rating: 5,
    review: '"Excellent customer service and amazing book quality. The packaging ensures books arrive in perfect condition. Highly recommended!"',
    name: "Emma Rodriguez",
    label: "Verified Buyer",
    avatar: "https://i.pravatar.cc/150?img=23",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} className={`w-4 h-4 ${s <= rating ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({ review }) => (
  <div className="bg-blue-50 rounded-2xl p-6 flex flex-col gap-4">
    <div className="flex items-center gap-2">
      <svg className="w-8 h-8 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <StarRating rating={review.rating} />
    </div>

    <p className="text-sm text-gray-700 leading-relaxed flex-1">{review.review}</p>

    <div className="flex items-center gap-3 mt-auto">
      <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
      <div>
        <p className="text-sm font-semibold text-gray-900">{review.name}</p>
        <p className="text-xs text-gray-500">{review.label}</p>
      </div>
    </div>
  </div>
);

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        // TODO: replace with real API call when ready
        // const res = await fetch("/api/v1/book-nest/reviews?limit=3");
        // const data = await res.json();
        // setReviews(Array.isArray(data) ? data : data.reviews ?? []);
        setReviews(DUMMY_REVIEWS);
      } catch {
        setReviews(DUMMY_REVIEWS);
      }
    };
    load();
  }, []);

  return (
    <section className="w-full bg-white py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">What Our Readers Say</h2>
          <p className="text-sm text-gray-500 mt-2">Join thousands of happy book lovers</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <ReviewCard key={r._id} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;