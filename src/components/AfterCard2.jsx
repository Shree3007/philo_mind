import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import bot from '../assets/bot.png';

const AfterCard2 = () => {
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader >
          <CardTitle className="flex justify-center"><img src={bot} className="w-[35px]" alt="" /><span className="mt-2 ">Philomind AI</span></CardTitle>
           <CardDescription className="flex flex-col justify-center items-center"><p>Personalized Mood Tracking & Timeless Wisdom,</p> Powered by AI</CardDescription> 
        </CardHeader>
      </Card>
    </div>
  );
};

export default AfterCard2;
