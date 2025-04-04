import { useEffect, useState } from "react";
import axios from "axios";

export default function About() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories"); // Update if needed
        setCategories(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className="text-center">Loading categories...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lesson Categories</h2>
      <ul className="list-disc pl-5">
        {categories.map((category) => (
          <li key={category._id} className="text-lg">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
