import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import achieve from '../assets/achieve.png';

const HomeCard4 = () => {
  return (
      <div className="w-1/2">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle><img src={achieve} className="w-1/5" alt="" /><span className="mt-1">Earn Badges</span></CardTitle>
                  {/* <CardDescription>50+ Lessons</CardDescription> */}
                </CardHeader>
              </Card>
            </div>
  )
}

export default HomeCard4
