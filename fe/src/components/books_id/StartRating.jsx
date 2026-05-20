const StarRating = ({ rating, size = "text-base", fill = true }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.4;
  return (
    <span className={`flex items-center gap-0.5 ${size} text-yellow-400`}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) return <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "inherit" }}>star</span>;
        if (i === full && half) return <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0.5", fontSize: "inherit" }}>star_half</span>;
        return <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0", fontSize: "inherit" }}>star</span>;
      })}
    </span>
  );
};

export default StarRating;