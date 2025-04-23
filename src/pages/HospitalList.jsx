import { useEffect, useState } from "react";
import axios from "axios";

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [city, setCity] = useState(""); // Track selected city
  const [cities, setCities] = useState([]); // Track list of cities
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1); // For pagination
  const [currentPage, setCurrentPage] = useState(1); // Track current page

  // Fetch hospitals with the selected city filter
  const fetchHospitals = async (page = currentPage) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/psy?city=${city}&page=${page}`
      );
      setHospitals(res.data.hospitals || []);
      setTotalPages(res.data.totalPages); // Set total pages from the backend
      setCurrentPage(res.data.currentPage); // Set current page from the backend
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the list of unique cities on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/psy");
        // Extract cities from the fetched hospitals and remove duplicates
        const cityList = [
          ...new Set(res.data.hospitals.map((hospital) => hospital.city)),
        ];
        setCities(cityList); // Set the cities state
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  // Fetch hospitals when the city or page changes
  useEffect(() => {
    fetchHospitals(); // Fetch hospitals on mount or when city changes
  }, [city, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchHospitals(page); // Fetch hospitals for the new page
  };

  return (
    <div className="min-h-screen bg-[#F5F1EA] font-[Outfit] p-4 pt-[100px] pb-[120px]">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Find a Psychological Hospital
      </h2>

      <select
        className="w-full mb-4 p-2 rounded-lg border border-gray-300"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="">All Cities</option>
        {/* Dynamically generate city options from the cities state */}
        {cities.map((cityName) => (
          <option key={cityName} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>

      {loading ? (
        <p className="text-center">Loading hospitals...</p>
      ) : hospitals.length > 0 ? (
        <div className="space-y-4">
          {hospitals.map((hospital) => (
            <div
              key={hospital._id}
              className="bg-white p-4 rounded-xl shadow flex flex-col"
            >
              <h3 className="text-lg font-semibold">{hospital.hospitalName}</h3>
              <p className="text-sm text-gray-600">
                {hospital.address}, {hospital.city}
              </p>
              <a
                href={hospital.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm mt-2 underline"
              >
                View on Map
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No hospitals found.</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HospitalList;
