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
    <div className="w-1/2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle><img src={book} className="w-1/5" alt="" /><span className="mt-1">50+ Lessons</span></CardTitle>
          {/* <CardDescription>50+ Lessons</CardDescription> */}
        </CardHeader>
      </Card>
    </div>
  );
};

export default AfterCard1;
