import React, { useEffect,useState } from "react";
import { BsDiscord } from "react-icons/bs";
import Title from "@/components/Title";
import HomeCard1 from "@/components/HomeCard1";
import HomeCard2 from "@/components/HomeCard2";
import HomeCard3 from "@/components/HomeCard3";
import HomeCard4 from "@/components/HomeCard4";
import { Button } from "@/components/ui/button";
import hero from "../assets/hero-img.jpeg";
import Slider from "@/components/Slider";
import { SiGmail } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { MdLocalFireDepartment } from "react-icons/md";
import { GiRank3 } from "react-icons/gi";
import { useUser, UserButton } from "@clerk/clerk-react";
import ImageSlider from "@/components/ImageSlider";
import AfterCard1 from "@/components/AfterCard1";
import AfterCard2 from "@/components/AfterCard2";
import { Link } from "react-router-dom";
import axios from 'axios'; // Import Axios
import BeforeSlider from "@/components/BeforeSlider";

const Home = () => {
  const { isSignedIn, user } = useUser();

   useEffect(() => {
      if (isSignedIn && user) {
        // Send user ID to backend using Axios
        axios.post('http://localhost:5000/api/register', {
          clerkUserId: user.id,
          email: user.primaryEmailAddress.emailAddress,
        })
        .then(response => {
          // console.log('User registered successfully:', response.data);
        })
        .catch(error => {
          console.error('Error registering user:', error);
        });
  
        // Optional: redirect to homepage
        // router.push('/');
      }
    }, [isSignedIn, user,[]]);


    //Rank,Streak and LessonsCompleted code 


    const [lessonsCompleted, setLessonsCompleted] = useState(null);
      const [streak, setStreak] = useState(null);
      const [badges, setBadges] = useState([]);
    
      useEffect(() => {
        const fetchStats = async () => {
          if (!user?.id) return;
    
          try {
            const response = await axios.get(`http://localhost:5000/api/profile/${user.id}`);
            const data = response.data;
    
            setLessonsCompleted(data.progress);
            setStreak(data.streak);
            setBadges(data.badges);
          } catch (error) {
            console.error("Error fetching stats:", error);
          }
        };
    
        fetchStats();
      }, [user?.id]);



  return (
    <div className="bg-[#F5F1EA] pb-[100px]">
      {isSignedIn ? (
        <div
          className=" p-2 bg-primary flex justify-between
            text-white pt-[82px]"
        >
          <p>Welcome {user.firstName} 😊</p>
          <div className="flex gap-2">
            <div className="flex gap-1">
              <p>{streak}</p>
              <MdLocalFireDepartment className="text-2xl text-orange-400" />
            </div>
            <GiRank3 className="text-2xl font-extrabold" />
          </div>
        </div>
      ) : (
        ""
      )}
      {isSignedIn ? (
        <div className="">
          <ImageSlider/>
        </div>
      ) : (
        <div>
        <div className="flex justify-center pt-[69px]">
          <img src={hero} className="w-full" alt="" />
        </div>
        <div className="h-20 flex justify-center bg-[#eee8e7]">
          <Button size="lg">Start Learning</Button>
        </div>
      </div>
      )}
      {isSignedIn ? (
        <div>
          <div className="w-full flex flex-col gap-5 p-5">
        <Link to='/categories'><AfterCard1 /></Link>
        <Link to='/ai'><AfterCard2 /></Link>
      </div>
        </div>
      ) : (
        <div>
      <div className="w-full flex flex-row gap-5 p-5">
        <HomeCard1 />
        <HomeCard2 />
      </div>
      <div className="w-full flex flex-row gap-5 px-5">
        <HomeCard3 />
        <HomeCard4 />
      </div>
      </div>
      )}

{isSignedIn ? (
        <div>
        <Slider />
      </div>
      ) : (
        <div>
          <BeforeSlider/>
      </div>
      )}
      <div className="flex justify-center">
  <div className="w-full flex flex-col items-center justify-center pt-6">
    <p className="text-[15px]">
      <Title text1={"Join The"} text2={"Community"} />
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
</div>

      <div className="mt-10 flex flex-col">
        <p className="flex justify-center text-xl font-semibold">
          Stay Connected With Us
        </p>
        <div className="w-full flex flex-row gap-14 justify-center mt-5">
          <SiGmail className="text-4xl" />
          <FaInstagram className="text-4xl" />
          <FaLinkedinIn className="text-4xl" />
        </div>
      </div>
      <div className="w-full mt-5 text-center py-4 text-gray-400 text-sm">
        © 2025 PhiloMind. All rights reserved.
      </div>
    </div>
  );
};

export default Home;
