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
    <div>
      <h2>{lesson.title}</h2>
      <p><strong>Category:</strong> {lesson.category.name}</p>
      <p>{lesson.content}</p>
    </div>
  );
};

export default Lessons;
