import React from "react";
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

const Home = () => {
  const { isSignedIn, user } = useUser();
  return (
    <div>
      {isSignedIn ? (
        <div
          className=" p-2 bg-primary flex justify-between
            text-white"
        >
          <p>Welcome {user.firstName}</p>
          <div className="flex gap-2">
            <div className="flex gap-1">
              <p>10</p>
              <MdLocalFireDepartment className="text-2xl text-orange-400" />
            </div>
            <GiRank3 className="text-2xl font-extrabold" />
          </div>
        </div>
      ) : (
        ""
      )}
      {isSignedIn ? (
        <div>
          <ImageSlider/>
        </div>
      ) : (
        <div>
        <div className="flex justify-center">
          <img src={hero} className="w-full" alt="" />
        </div>
        <div className="h-20 flex justify-center bg-[#eee8e7]">
          <Button size="lg">Start Learning</Button>
        </div>
      </div>
      )}
      <div className="w-full flex flex-row gap-5 p-5">
        <HomeCard1 />
        <HomeCard2 />
      </div>
      <div className="w-full flex flex-row gap-5 p-5">
        <HomeCard3 />
        <HomeCard4 />
      </div>
      <div>
        <Slider />
      </div>
      <div className="flex justify-center">
        <div className="w-full flex flex-col items-center justify-center pt-6">
          <p className="text-[15px]">
            <Title text1={"Join The"} text2={"Community"} />
          </p>
          <BsDiscord className="h-[100px] w-[100px]" />
          <p>Become part of our community</p>
          <Button className="p-5 mt-5">Join Discord</Button>
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
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;
