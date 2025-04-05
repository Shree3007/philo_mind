import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Lessons = () => {
  const { lessonID } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/lessons/${lessonID}`
        );
        setLesson(response.data);
      } catch (error) {
        console.error("Error fetching lesson:", error);
      }
    };
    fetchLesson();
  }, [lessonID]);

  if (!lesson) return <h2>Loading...</h2>;

  return (
    <div className="bg-[#F5F1EA] h-screen">
      <div className="bg-black text-white text-center p-2 text-3xl">
      {lesson.category.name}
      </div>
      <div className="p-4">
      <h2 className="p-2 text-2xl font-semibold">{lesson.title} :</h2>
      <p className="p-2 mt-3 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] rounded-lg text-center transition-transform transform hover:scale-105">{lesson.content}</p>
      </div>
      
    </div>
  );
};

export default Lessons;
