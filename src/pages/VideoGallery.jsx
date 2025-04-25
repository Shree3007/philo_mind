// src/components/VideoGallery.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/videos?page=${page}`
      );
      setVideos(Array.isArray(res.data.videos) ? res.data.videos : []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [page]);

  return (
    <div className="min-h-screen bg-[#F5F1EA] font-[Outfit] p-4 pt-[100px] pb-[100px]">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        📺 Philosophy Videos
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading videos...</p>
      ) : videos.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {videos.map((video, idx) => (
            <a
              href={video.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              className="group bg-white rounded-2xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1 block overflow-hidden border border-gray-100"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-sm text-gray-800 font-medium group-hover:text-indigo-600 line-clamp-2">
                {video.title}
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No videos found.</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 disabled:opacity-50"
        >
          ← Previous
        </button>
        <span className="text-sm text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default VideoGallery;
