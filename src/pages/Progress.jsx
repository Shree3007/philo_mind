import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Progress = () => {
  const { user } = useUser();

  const [lessonsCompleted, setLessonsCompleted] = useState(null);
  const [streak, setStreak] = useState(null);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${user.id}`);
        const data = response.data;

        setLessonsCompleted(data.progress);
        setStreak(data.streak);
        setBadges(data.badges);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [user?.id]);

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className="px-8 bg-[#F7F6F3] font-[Outfit] items-center justify-center">
      <div className="py-14">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center space-y-6">
          <img
            src={user?.imageUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-[#f0ece4]"
          />
          <div>
            <h2 className="text-2xl font-semibold text-[#2B2B2B]">{user?.fullName}</h2>
            <p className="text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>

          <div className="flex justify-around items-center bg-[#F7F6F3] rounded-xl py-4">
            <div>
              <p className="text-xl font-bold text-[#2B2B2B]">{lessonsCompleted ?? "–"}</p>
              <p className="text-sm text-gray-500">Lessons</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#2B2B2B]">{streak ?? "–"}</p>
              <p className="text-sm text-gray-500">Streak</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-2">Badges</h3>
            {badges.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-2">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className="bg-[#E8E6DF] text-sm text-[#2B2B2B] px-3 py-1 rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No badges yet</p>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-4 bg-[#2B2B2B] text-white py-2 rounded-xl font-semibold hover:bg-[#1f1f1f] transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Progress;
