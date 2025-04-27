import { useUser, useClerk } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdLocalFireDepartment } from "react-icons/md";
import { useStore } from "@/store/useStore";
import { TbBadgeFilled } from "react-icons/tb";

const Progress = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState("");
  const [loading, setLoading] = useState(true);
  const backendUrl = useStore((state) => state.backendUrl);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) return;
      try {
        const response = await axios.get(
          `${backendUrl}/api/profile/${user.id}`
        );
        const data = response.data;

        setLessonsCompleted(
          typeof data.progress === "number" ? data.progress : 0
        );
        setStreak(typeof data.streak === "number" ? data.streak : 0);
        setBadges(data.badge);
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

  // 🌟 New: Badge Color Mapping
  const getBadgeColor = (badgeName) => {
    switch (badgeName) {
      case "Bronze Explorer":
        return "text-[#CD7F32]"; // bronze color
      case "Silver Seeker":
        return "text-[#C0C0C0]"; // silver color
      case "Gold Philosopher":
        return "text-[#FFD700]"; // gold color
      case "Platinum Sage":
        return "text-[#E5E4E2]"; // platinum color
      case "Diamond Enlightened":
        return "text-[#B9F2FF]"; // diamond color
      default:
        return "text-black"; // no badge
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F5F1EA]">
        <p className="text-gray-600 text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1EA] px-6 font-[Outfit] flex justify-center items-start pt-[110px] pb-[100px]">
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
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-2">Badge</h3>

            <div className="flex flex-wrap justify-center gap-2">
              <div className="flex gap-2 bg-[#E8E6DF] text-lg text-[#2B2B2B] px-6 py-3 rounded-full shadow-sm">
                <TbBadgeFilled
                  className={`text-[30px] ${getBadgeColor(badges)}`}
                />
                <span>{badges}</span>
              </div>
            </div>
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
