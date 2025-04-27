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

const HomeCard2 = () => {
  return (
   <div className="w-1/2">
         <Card className="w-full">
           <CardHeader>
             <CardTitle><img src={bot} className="w-1/5" alt="" /><span className="mt-1">AI-Powered</span></CardTitle>
             {/* <CardDescription>50+ Lessons</CardDescription> */}
           </CardHeader>
         </Card>
       </div>
  );
};

export default HomeCard2;
