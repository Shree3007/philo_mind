import React from "react";
import { FaHome, FaBook, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { useUser, UserButton } from "@clerk/clerk-react";

export default function Footer() {
  const { isSignedIn } = useUser();
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-gray-950 flex justify-around items-center p-4 z-50">
    {/* Home Icon */}
    <div className="flex flex-col items-center cursor-pointer">
      <FaHome className="text-2xl text-gray-700" />
      <p className="text-sm">Home</p>
    </div>
    {/* Lessons Icon */}
    {isSignedIn ? (
            <div className="flex flex-col items-center cursor-pointer">
            <FaBook className="text-2xl text-gray-700" />
            <p className="text-sm">Lessons</p>
          </div>
          ) : (
            ''
          )}
    {/* AI Button */}
    {isSignedIn ? (
            <div className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold shadow-lg -mt-10">
            AI
          </div>
          ) : (
            ''
          )}
    {/* About Icon */}
    <div className="flex flex-col items-center cursor-pointer">
      <FaInfoCircle className="text-2xl text-gray-700" />
      <p className="text-sm">About</p>
    </div>
    {/* Contact Icon */}
    {isSignedIn ? (
            <div className="flex flex-col items-center cursor-pointer">
            <FaEnvelope className="text-2xl text-gray-700" />
            <p className="text-sm">Contact</p>
          </div>
          ) : (
            ''
          )}
  </div>
  );
}
