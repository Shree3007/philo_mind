import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CatLessons = () => {
  const { categoryID } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/lessons/category/${categoryID}`
        );
        setLessons(response.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };
    fetchLessons();
  }, [categoryID]);

  return (
    <div>
      <h2>Lessons in this Category</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {lessons.map((lesson) => (
          <div key={lesson._id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", cursor: "pointer" }}
            onClick={() => navigate(`/lessons/${lesson._id}`)}>
            <h3>{lesson.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatLessons;
