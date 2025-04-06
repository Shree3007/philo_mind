import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const contentItems = [
  {
    title: "AI-Driven Insights",
    description: "How wonderful it is that nobody need wait a single moment before starting to improve the world",
    buttonText: "Anne Frank",
  },
  {
    title: "Smart Recommendations",
    description: "You do not write your life with words...You write it with actions. What you think is not important. It is only important what you do.",
    buttonText: "Patrick Ness",
  },
  {
    title: "Deep Learning Power",
    description: "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.",
    buttonText: "J.K. Rowling",
  },
  {
    title: "Advanced Analytics",
    description: "We are addicted to our thoughts. We cannot change anything if we cannot change our thinking.",
    buttonText: "Santosh Kalwar",
  },
  {
    title: "Advanced Analytics",
    description: "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
    buttonText: "Albert Einstein",
  },
  {
    title: "Advanced Analytics",
    description: "If anyone tells you that a certain person speaks ill of you, do not make excuses about what is said of you but answer, He was ignorant of my other faults, else he would not have mentioned these alone.",
    buttonText: "Epictetus",
  },
];

export default function BeforeSlider() {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: ["0%", "-100%"],
        transition: { repeat: Infinity, duration: 100, ease: "linear" },
      });
    } else {
      controls.stop();
    }
  }, [isHovered, controls]);

  return (
    <div className="overflow-hidden w-full py-8">
      <motion.div
        className="flex w-max gap-6"
        animate={controls}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {[...contentItems, ...contentItems].map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-center min-w-[300px] max-w-[350px]"
          >
            <h2 className="text-xl font-bold text-black">{item.title}</h2>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <p className="mt-4  text-black px-4 py-2 rounded-md">
              - {item.buttonText}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
