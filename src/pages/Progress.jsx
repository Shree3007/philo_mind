import { useUser, useClerk } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdLocalFireDepartment } from "react-icons/md";

const Progress = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profile/${user.id}`
        );
        const data = response.data;

        setLessonsCompleted(
          typeof data.progress === "number" ? data.progress : 0
        );
        setStreak(typeof data.streak === "number" ? data.streak : 0);
        setBadges(Array.isArray(data.badges) ? data.badges : []);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user?.id]);

  const handleLogout = () => {
    signOut(() => {
      window.location.href = "/";
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F7F6F3]">
        <p className="text-gray-600 text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F3] px-6 font-[Outfit] flex justify-center items-start pt-[110px] pb-[100px]">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 animate-fade-in">
        <div className="text-center space-y-6">
          <img
            src={user?.imageUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-[#e2dfd6] shadow-md"
          />

          <div>
            <h2 className="text-2xl font-bold text-[#2B2B2B] tracking-tight">
              {user?.fullName}
            </h2>
            <p className="text-gray-500 text-sm">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>

          <div className="flex justify-between items-center bg-[#F7F6F3] rounded-xl py-4 px-6 border border-[#e6e3da] shadow-inner">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2B2B2B]">
                {lessonsCompleted}
              </p>
              <p className="text-sm text-gray-500">Lessons</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <p className="text-2xl font-bold text-[#2B2B2B]">{streak}</p>
                <MdLocalFireDepartment className="text-3xl text-orange-400 animate-pulse" />
              </div>
              <p className="text-sm text-gray-500">Streak</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-2">
              Badges
            </h3>
            {badges.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-2">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className="bg-[#E8E6DF] text-sm text-[#2B2B2B] px-3 py-1 rounded-full shadow-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No badges yet</p>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-6 bg-[#2B2B2B] text-white py-2 rounded-xl font-semibold hover:bg-[#1f1f1f] transition-all shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Progress;
