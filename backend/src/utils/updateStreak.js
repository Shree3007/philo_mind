const updateStreak = async (user) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const lastUpdated = user.streak?.lastUpdated
    ? new Date(user.streak.lastUpdated).toISOString().split("T")[0]
    : null;

  if (lastUpdated === today) return;

  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  if (lastUpdated === yesterday) {
    user.streak.count += 1;
  } else {
    user.streak.count = 1;
  }

  user.streak.lastUpdated = new Date();
};

module.exports = { updateStreak };
