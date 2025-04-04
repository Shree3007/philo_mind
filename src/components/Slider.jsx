import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const contentItems = [
  {
    title: "AI-Driven Insights",
    description: "Gain wisdom from an intelligent chatbot trained on philosophy.",
    buttonText: "Explore",
  },
  {
    title: "Smart Recommendations",
    description: "Get personalized suggestions based on AI-driven analysis.",
    buttonText: "Discover",
  },
  {
    title: "Deep Learning Power",
    description: "Harness the power of neural networks for accurate insights.",
    buttonText: "Learn More",
  },
  {
    title: "Advanced Analytics",
    description: "Analyze trends and patterns with cutting-edge technology.",
    buttonText: "Analyze",
  },
];

export default function Slider() {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: ["0%", "-100%"],
        transition: { repeat: Infinity, duration: 35, ease: "linear" },
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
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition">
              {item.buttonText}
            </button>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
