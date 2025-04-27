import React from "react";
import bot from "../assets/bot.png";
import { ChevronRight } from "lucide-react";
import { FaRegHospital } from "react-icons/fa";

const AfterCard4 = () => {
  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-md flex font-[Outfit] overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      {/* Left Section: Icon + Text */}
      <div className="flex items-start space-x-4 p-4 w-full">
        {/* Icon */}
        <FaRegHospital className="mt-3 w-16 h-10" />

        {/* Title + Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Psychiatrists Near you
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Find professional help and nearby mental health services
          </p>
        </div>
      </div>

      {/* Right Arrow Section */}
      <div className="bg-primary flex items-center justify-center px-4">
        <ChevronRight className="text-white w-6 h-6 " />
      </div>
    </div>
  );
};

export default AfterCard4;
