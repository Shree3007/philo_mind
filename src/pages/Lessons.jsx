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

  if (!lesson)
    return <div className="text-center mt-40 text-lg">Loading...</div>;

  return (
    <div className="bg-[#F5F1EA] min-h-screen pt-20 pb-32 font-[Outfit]">
      {/* Category Header */}
      <div className="bg-[#1F1F1F] text-white py-3 text-center shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">
          {lesson.category.name}
        </h1>
      </div>

      {/* Lesson Content */}
      <div className="max-w-4xl mx-auto px-6 mt-6 ">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          {lesson.title}
        </h2>

        <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 leading-relaxed">
            {lesson.content.map((point, index) => (
              <li
                key={index}
                className="hover:translate-x-1 transition-transform duration-200"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
