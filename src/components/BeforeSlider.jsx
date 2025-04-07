import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const contentItems = [
  {
    title: "AI-Driven Insights",
    description: "Gain wisdom from an intelligent chatbot trained on philosophy",
    buttonText: "Explore More",
  },
  {
    title: "Philosophical Lessons",
    description: "Learn timeless philosophical concepts in bite-sized lessons.",
    buttonText: "Explore More",
  },
  {
    title: "Track Progress",
    description: "Your journey is saved—resume from where you left off anytime.",
    buttonText: "Explore More",
  },
  {
    title: "Earn Badges & Streaks",
    description: "Stay motivated through gamified learning.",
    buttonText: "Explore More",
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
             <Link to='/login'><Button className='mt-5'>
              {item.buttonText}
            </Button> </Link>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
