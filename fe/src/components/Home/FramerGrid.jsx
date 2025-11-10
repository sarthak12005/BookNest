import { motion } from "framer-motion";

export default function FloatingGrid() {
  const floatAnimation = { y: [0, -8, 0] };
  const floatTransition = { duration: 3, repeat: Infinity, ease: "easeInOut" };

  const books = [
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&q=60&w=600",
    "https://images.unsplash.com/photo-1667312939934-60fc3bfa4ec0?auto=format&q=60&w=600"
  ];

  // ✅ Updated positions for perfect layout
  const positions = [
    "top-[-10%] left-[-3%]",
    "top-[-10%] right-[15%]",
    "bottom-[-15%] right-[-5%]",
    "bottom-[-15%] left-[15%]"
  ];

  return (
    <div className="w-full h-full relative">
      {books.map((img, i) => (
        <motion.div
          key={i}
          className={`w-[180px] h-[230px] absolute rounded-xl shadow-2xl bg-cover bg-center ${positions[i]}`}
          style={{ backgroundImage: `url(${img})` }}
          animate={floatAnimation}
          transition={{ ...floatTransition, delay: i * 0.3 }}
          whileHover={{ scale: 1.05 }}
        />
      ))}
    </div>
  );
}
