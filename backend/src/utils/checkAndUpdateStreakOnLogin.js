const checkAndUpdateStreakOnLogin = async (user) => {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  
    const lastUpdated = user.streak?.lastUpdated
      ? new Date(user.streak.lastUpdated).toISOString().split("T")[0]
      : null;
  
    // Initialize streak for new users
    if (!user.streak) {
      user.streak = {
        count: 0,
        lastUpdated: null,
      };
    }
  
    const hasCompletedToday = user.progress.some((item) => {
      if (!item.completedAt || !item.status) return false;
      const completedDate = new Date(item.completedAt).toISOString().split("T")[0];
      return completedDate === today;
    });
  
    if (hasCompletedToday) {
      if (lastUpdated !== today) {
        if (lastUpdated === yesterday) {
          user.streak.count += 1;
        } else {
          user.streak.count = 1;
        }
        user.streak.lastUpdated = new Date();
      }
    } else {
      if (!lastUpdated || (lastUpdated !== today && lastUpdated !== yesterday)) {
        user.streak.count = 0;
        user.streak.lastUpdated = new Date();
      }
    }
  
    await user.save();
    return user.streak;
  };
  
  module.exports = { checkAndUpdateStreakOnLogin };