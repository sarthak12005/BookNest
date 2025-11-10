import { motion } from "framer-motion";

export default function FloatingGrid() {
  const floatAnimation = { y: [0, -3, 0] };
  const floatTransition = { duration: 3, repeat: Infinity, ease: "easeInOut" };

  const books = [
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJvb2tzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1667312939934-60fc3bfa4ec0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2tzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600"
  ];

  const positions = [
    "top-[10%] left-16",
    "top-[8%] right-10",
    "bottom-[10%] right-16",
    "bottom-[8%] left-10"
  ];

  return (
    <>
      <div className="h-screen">
        {books.map((img, i) => (
          <motion.div
            key={i}
            className={`w-[160px] h-[200px] absolute rounded-xl shadow-xl bg-cover bg-center ${positions[i]}`}
            style={{ backgroundImage: `url(${img})` }}
            animate={floatAnimation}
            transition={{ ...floatTransition, delay: i * 0.4 }}
            whileHover={{ scale: 1.05 }}
          />
        ))}
      </div>
    </>
  );
}
