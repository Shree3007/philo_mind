import React from "react";
import { FaHome, FaBook, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { useUser, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { GiProgression } from "react-icons/gi";

export default function Footer() {
  const { isSignedIn } = useUser();
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-6px_16px_rgba(0,0,0,0.3)] flex justify-around items-center p-4 z-50"
>
    {/* Home Icon */}
    <Link to='/'><div className="flex flex-col items-center cursor-pointer">
      <FaHome className="text-2xl text-black" />
      <p className="text-sm">Home</p>
    </div></Link>
    {/* Lessons Icon */}
    {isSignedIn ? (
            <Link to='/categories'><div className="flex flex-col items-center cursor-pointer">
            <FaBook className="text-2xl text-black" />
            <p className="text-sm">Lessons</p>
          </div></Link>
          ) : (
            ''
          )}
    {/* AI Button */}
    {isSignedIn ? (
            <Link to= '/ai'><div className="bg-primary text-white w-16 h-16 flex items-center justify-center rounded-full text-xl font-bold shadow-lg -mt-14">
            AI
          </div></Link>
          ) : (
            ''
          )}
    {/* About Icon */}
    <Link to='/about'><div className="flex flex-col items-center cursor-pointer">
      <FaInfoCircle className="text-2xl text-black" />
      <p className="text-sm">About</p>
    </div></Link>
    {/* Contact Icon */}
    {isSignedIn ? (
            <Link to= '/progress'><div className="flex flex-col items-center cursor-pointer">
            <GiProgression className="text-2xl text-black" />
            <p className="text-sm">Progress</p>
          </div></Link>
          ) : (
            ''
          )}
  </div>
  );
}
