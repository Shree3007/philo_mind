
const assignBadge = (user) => {
    const completedLessonsCount = user.progress.filter(item => item.status === true).length;
  
    if (completedLessonsCount >= 1 && completedLessonsCount <= 5) {
      user.badge = "Bronze Explorer";
    } else if (completedLessonsCount >= 6 && completedLessonsCount <= 15) {
      user.badge = "Silver Seeker";
    } else if (completedLessonsCount >= 16 && completedLessonsCount <= 30) {
      user.badge = "Gold Philosopher";
    } else if (completedLessonsCount >= 31 && completedLessonsCount <= 50) {
      user.badge = "Platinum Sage";
    } else if (completedLessonsCount >= 51) {
      user.badge = "Diamond Enlightened";
    } else {
      user.badge = "No Badge";
    }
  };

  module.exports={assignBadge}