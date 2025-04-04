import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import hero1 from '../assets/hero1.png'
import hero2 from '../assets/hero2.jpg'
import hero3 from '../assets/hero3.jpg'
import hero4 from '../assets/hero4.jpg'

const images = [
  hero1,
  hero2,
  hero3,
  hero4,
];

export default function ImageSlider() {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: ["0%", "-100%"],
        transition: { repeat: Infinity, duration: 25, ease: "linear" },
      });
    } else {
      controls.stop();
    }
  }, [isHovered, controls]);

  return (
    <div className="overflow-hidden w-full py-3">
      <motion.div
        className="flex w-max gap-6"
        animate={controls}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {[...images, ...images].map((image, index) => (
          <div key={index} className="min-w-[300px] max-w-[400px]">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[350px] rounded-lg shadow-lg"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
