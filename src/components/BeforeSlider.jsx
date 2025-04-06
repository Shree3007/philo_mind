import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const contentItems = [
  {
    title: "AI-Driven Insights",
    description: "Gain wisdom from an intelligent chatbot trained on philosophy",
    buttonText: "",
  },
  {
    title: "Philosophical Lessons",
    description: "Learn timeless philosophical concepts in bite-sized lessons.",
    buttonText: "",
  },
  {
    title: "Track Progress",
    description: "Your journey is saved—resume from where you left off anytime.",
    buttonText: "",
  },
  {
    title: "Earn Badges & Streaks",
    description: "Stay motivated through gamified learning.",
    buttonText: "",
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
            {/* <p className="mt-4  text-black px-4 py-2 rounded-md">
              - {item.buttonText}
            </p> */}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
