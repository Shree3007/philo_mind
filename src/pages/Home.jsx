import React from 'react';
import logo from '../assets/logo.jpg';
import { BsDiscord } from "react-icons/bs";
import Title from '@/components/Title';
import HomeCard1 from '@/components/HomeCard1';
import HomeCard2 from '@/components/HomeCard2';
import HomeCard3 from '@/components/HomeCard3';
import HomeCard4 from '@/components/HomeCard4';
import { Button } from '@/components/ui/button';
import hero from '../assets/hero-img.jpeg';
import Slider from "@/components/Slider";

const Home = () => {
  return (
    <div >
    <div className="flex justify-center">
      <img src={hero} className='w-full' alt="" />
      {/* <div className="w-1/2 flex flex-col items-center justify-center pt-9">
        <img src={logo} alt="Logo" className="max-w-full h-[200px] border border-gray-500" />
        <p className='text-[30px]'><Title text1={'Philo'} text2={'Mind'}/></p>
      </div> */}
    </div>
    <div className='h-20 flex justify-center bg-[#eee8e7]'>
        <Button size="lg">Start Learning</Button>
    </div>
    <div className='w-full flex flex-row gap-5 p-5'>
    <HomeCard1/>
    <HomeCard2/>
    </div>
    <div className='w-full flex flex-row gap-5 p-5'>
    <HomeCard3/>
    <HomeCard4/>
    </div>
    <Slider/>
    <div className="flex justify-center">
      <div className="w-full flex flex-col items-center justify-center pt-9">
      <p className='text-[15px]'><Title text1={'Join The'} text2={'Community'}/></p>
      <BsDiscord className="h-[100px] w-[100px]" />
      <p>Become part of our community</p>
      <Button className='p-5 mt-5'>Join Discord</Button>
      </div>
    </div>
    <div className='mt-12 flex flex-col'>
      <p className='flex justify-center text-xl font-semibold'>Stay Connected With Us</p>
      <div>
        gag
      </div>
    </div>
    <br /><br /><br /><br />
    </div>
  );
}

export default Home;
