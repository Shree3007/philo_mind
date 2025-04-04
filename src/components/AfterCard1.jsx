import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import book from '../assets/open-book.png';

const AfterCard1 = () => {
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-center"><img src={book} className="w-[35px]" alt="" /><span className="mt-2">Philosophical Lessons</span></CardTitle>
           <CardDescription className="flex flex-col justify-center items-center"><p>Explore Timeless Philospohical Lessons for a</p>  <p>Deeper Understanding of Life </p></CardDescription> 
        </CardHeader>
      </Card>
    </div>
  );
};

export default AfterCard1;
