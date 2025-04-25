import React, { useEffect, useState } from "react";
import { BsDiscord } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdLocalFireDepartment } from "react-icons/md";
import { GiRank3 } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import Title from "@/components/Title";
import HomeCard1 from "@/components/HomeCard1";
import HomeCard2 from "@/components/HomeCard2";
import HomeCard3 from "@/components/HomeCard3";
import HomeCard4 from "@/components/HomeCard4";
import ImageSlider from "@/components/ImageSlider";
import AfterCard1 from "@/components/AfterCard1";
import AfterCard2 from "@/components/AfterCard2";
import Slider from "@/components/Slider";
import BeforeSlider from "@/components/BeforeSlider";
import MoodQuiz from "./MoodQuiz";

import hero from "../assets/hero-img.jpeg";

const Home = () => {
  const { isSignedIn, user } = useUser();
  const [lessonsCompleted, setLessonsCompleted] = useState(null);
  const [streak, setStreak] = useState(null);
  const [badges, setBadges] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isSignedIn && user) {
        try {
          // Register user
          await axios.post("http://localhost:5000/api/register", {
            clerkUserId: user.id,
            email: user.primaryEmailAddress.emailAddress,
          });

          // ✅ Check and update streak
          await axios.patch("http://localhost:5000/api/checkStreak", {
            clerkUserId: user.id,
          });

          // Fetch updated profile
          const res = await axios.get(
            `http://localhost:5000/api/profile/${user.id}`
          );
          setLessonsCompleted(res.data.progress);
          setStreak(res.data.streak);
          setBadges(res.data.badges);
        } catch (err) {
          console.error("Error loading user data:", err);
        }
      }
    };

    fetchUserData();
  }, [isSignedIn, user]);

  return (
    <div className="bg-[#F5F1EA] pb-[100px] font-[Outfit] relative">
      {isSignedIn && (
        <div className="bg-primary text-white p-2 pt-[82px] flex justify-between items-center">
          <p>Welcome {user.firstName} 😊</p>
          <div className="flex gap-2">
            <div className="flex gap-1 items-center">
              <p>{streak}</p>
              <MdLocalFireDepartment className="text-2xl text-orange-400" />
            </div>
            <GiRank3 className="text-2xl font-bold" />
          </div>
        </div>
      )}

      {isSignedIn ? (
        <ImageSlider />
      ) : (
        <div>
          <div className="flex justify-center pt-[69px]">
            <img src={hero} className="w-full" alt="hero" />
          </div>
          <div className="h-20 flex justify-center bg-[#eee8e7]">
            <Button size="lg">Start Learning</Button>
          </div>
        </div>
      )}

      {isSignedIn ? (
        <div className="p-5 flex flex-col gap-5">
          <Link to="/categories">
            <AfterCard1 />
          </Link>
          <Link to="/ai">
            <AfterCard2 />
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-row gap-5 p-5">
            <HomeCard1 />
            <HomeCard2 />
          </div>
          <div className="flex flex-row gap-5 px-5">
            <HomeCard3 />
            <HomeCard4 />
          </div>
        </>
      )}

      {isSignedIn ? <Slider /> : <BeforeSlider />}

      {/* Floating Action Button */}
      {isSignedIn && (
        <Link to="/MoodQuiz">
          <button
            onClick={() => setShowModal(true)}
            className="pb-[100px] fixed bottom-6 right-6 bg-black text-white text-2xl rounded-full p-4 shadow-lg hover:bg-gray-800 transition"
          >
            🧠
          </button>
        </Link>
      )}

      {/* Animated Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-black text-lg"
              >
                ✖
              </button>
              <MoodQuiz userId={user.id} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center pt-6">
        <p className="text-[15px]">
          <Title text1="Join The" text2="Community" />
        </p>
        <BsDiscord className="h-[100px] w-[100px]" />
        <p>Become part of our community</p>
        <Button
          className="p-5 mt-5"
          onClick={() => window.open("https://discord.gg/8ZPR57XfcG", "_blank")}
        >
          Join Discord
        </Button>
      </div>

      <div className="mt-10 text-center">
        <p className="text-xl font-semibold">Stay Connected With Us</p>
        <div className="flex gap-14 justify-center mt-5 text-4xl">
          <SiGmail />
          <FaInstagram />
          <FaLinkedinIn />
        </div>
        <p className="mt-5 text-gray-400 text-sm">
          © 2025 PhiloMind. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Home;
