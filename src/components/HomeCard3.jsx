import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import roadmap from '../assets/roadmap.png';

const HomeCard3 = () => {
  return (
     <div className="w-1/2">
             <Card className="w-full">
               <CardHeader>
                 <CardTitle><img src={roadmap} className="w-1/5" alt="" /><span className="mt-1 text-center">Track Progress</span></CardTitle>
                 {/* <CardDescription>50+ Lessons</CardDescription> */}
               </CardHeader>
             </Card>
           </div>
  )
}

export default HomeCard3
