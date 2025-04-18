import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const CatLessons = () => {
  const { categoryID } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const { user } = useUser(); // Get logged-in user

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        if (!user || !user.id) return; // Wait until user is available

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

      // Update frontend state
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
    <div className="pt-[100px] pb-[120px] p-4 bg-[#F5F1EA] min-h-screen">
      <h2 className="text-3xl mb-4">Lessons:</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {lessons.map((lesson) => (
          <div
            key={lesson.lessonId}
            className="mt-5 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] rounded-lg p-4 text-center transition-transform transform hover:scale-105"
          >
            <div className="flex items-center justify-between gap-2">
              <h2
                className="text-xl cursor-pointer"
                onClick={() => navigate(`/lessons/${lesson.lessonId}`)}
              >
                {lesson.title}
              </h2>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={lesson.status === true}
                  onChange={() =>
                    handleCheckboxChange(lesson.lessonId, lesson.status)
                  }
                  className="hidden"
                />
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300
                  ${lesson.status ? "bg-green-500" : "bg-gray-300"}`}
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
                </span>
              </label>
            </div>
          </div>
        ))}
      </div>
      <br /><br /><br /><br />
    </div>
  );
};

export default CatLessons;
