import React from "react";
import Slider from "react-slick";

import hero1 from "../assets/hero1.png";
import hero2 from "../assets/heroo2.png";
import hero3 from "../assets/heroo3.png";
import hero4 from "../assets/heroo4.png";

const images = [hero1, hero2, hero3, hero4];

export default function ImageSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-5 overflow-hidden">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx} className="px-4">
            <img
              src={img}
              alt={`Slide ${idx}`}
              className="w-full h-[400px]  rounded-xl shadow-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
