import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const Lessons = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    Lessons();
  }, []);

  if (loading) return <p className="text-center text-xl">Loading categories...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-[#F5F1EA] p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Lesson Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
            <Link key={category._id} to={`/categories/${category._id}`}>
          <div key={category._id} className="bg-white shadow-lg rounded-lg p-4 text-center transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold">{category.name}</h3>
            <p className="text-gray-600 mt-2">{category.description || "No description available"}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
