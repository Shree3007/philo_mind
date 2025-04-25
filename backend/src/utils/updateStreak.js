const updateStreak = (user) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // If streak doesn't exist or is not initialized correctly
  if (
    !user.streak ||
    user.streak.count === undefined ||
    user.streak.count === 0 ||
    !user.streak.lastUpdated
  ) {
    user.streak = {
      count: 1,
      lastUpdated: new Date(),
    };
    return;
  }

  const lastUpdated = new Date(user.streak.lastUpdated).toISOString().split("T")[0];

  if (lastUpdated === today) {
    return; // Already updated today
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  if (lastUpdated === yesterday) {
    user.streak.count += 1;
  } else {
    user.streak.count = 1; // Reset streak if a day was missed
  }

  user.streak.lastUpdated = new Date();
};

module.exports = { updateStreak };