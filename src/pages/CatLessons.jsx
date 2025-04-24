import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const CatLessons = () => {
  const { categoryID } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        if (!user?.id) return;

        const response = await axios.get(
          `http://localhost:5000/api/lessons/category/${categoryID}?clerkUserId=${user.id}`
        );
        setLessons(response.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, [categoryID, user]);

  const handleCheckboxChange = async (lessonId, currentStatus) => {
    const newStatus = !currentStatus;

    try {
      await axios.patch("http://localhost:5000/api/updateStatus", {
        clerkUserId: user.id,
        lessonId,
        status: newStatus,
      });

      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson.lessonId === lessonId
            ? { ...lesson, status: newStatus }
            : lesson
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="pt-[100px] pb-[120px] px-6 bg-[#F5F1EA] min-h-screen font-[Outfit]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-semibold text-center mb-10 text-[#2B2B2B]">
          Explore Lessons
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {lessons.map((lesson) => (
            <div
              key={lesson.lessonId}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 group"
            >
              <div className="flex justify-between items-center mb-4">
                <h3
                  onClick={() => navigate(`/lessons/${lesson.lessonId}`)}
                  className="text-lg font-semibold text-[#2B2B2B] cursor-pointer group-hover:text-indigo-600 transition"
                >
                  {lesson.title}
                </h3>

                {/* Custom Checkbox */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lesson.status === true}
                    onChange={() =>
                      handleCheckboxChange(lesson.lessonId, lesson.status)
                    }
                    className="sr-only peer"
                  />
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300
                    ${
                      lesson.status
                        ? "bg-green-500 peer-checked:shadow-lg"
                        : "bg-gray-300"
                    }`}
                  >
                    {lesson.status && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </label>
              </div>
              <p className="text-sm text-gray-500">
                {lesson.status ? "Marked as complete" : "Incomplete"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatLessons;
