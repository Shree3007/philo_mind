import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "@/store/useStore";

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const backendUrl = useStore((state) => state.backendUrl);

  const fetchHospitals = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${backendUrl}/api/psy?city=${city}&page=${page}`
      );
      setHospitals(res.data.hospitals || []);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/cities`);
        setCities(res.data.cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, [backendUrl]);

  useEffect(() => {
    fetchHospitals(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleClearFilter = () => {
    setCity("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F5F1EA] font-[Outfit] p-4 pt-[100px] pb-[120px]">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Psychiatrists Near You
      </h2>

      {/* City Filter Dropdown with Clear Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <div className="flex items-center gap-2 w-full sm:w-1/3">
          <select
            className="flex-1 p-2 rounded-lg border border-gray-300"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Cities</option>
            {cities.map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>

          {city && (
            <button
              onClick={handleClearFilter}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full text-sm transition"
              title="Clear"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Hospitals List */}
      {loading ? (
        <p className="text-center text-gray-600">Loading hospitals...</p>
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
              {hospital.mapLink && (
                <a
                  href={hospital.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm mt-2 underline"
                >
                  View on Map
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No hospitals found.</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>

        <span className="text-sm text-gray-700">
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
