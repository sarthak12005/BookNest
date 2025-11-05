import { motion } from "framer-motion";

export default function FloatingGrid() {
  const floatAnimation = {
    y: [0, -15, 0], // up & down
  };

  const floatTransition = {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <>
      
      {/* top left */}
      <motion.div
        className="w-[160px] h-[200px] absolute top-[5%] left-10 rounded-xl shadow-xl"
        animate={floatAnimation}
        transition={{ ...floatTransition, delay: 0 }}
        whileHover={{ scale: 1.05 }}
      />

      {/* top right */}
      <motion.div
        className="w-[160px] h-[200px] bg-red-500 absolute top-[5%] right-8 rounded-xl shadow-xl"
        animate={floatAnimation}
        transition={{ ...floatTransition, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
      />

      {/* bottom right */}
      <motion.div
        className="w-[160px] h-[200px] bg-red-500 absolute bottom-[5%] right-8 rounded-xl shadow-xl"
        animate={floatAnimation}
        transition={{ ...floatTransition, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
      />

      {/* bottom left */}
      <motion.div
        className="w-[160px] h-[200px] bg-red-500 absolute bottom-[5%] left-6 rounded-xl shadow-xl"
        animate={floatAnimation}
        transition={{ ...floatTransition, delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
      />

    </>
  );
}
