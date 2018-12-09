export const timeFormat = time => {
  const timeObject = new Date(time);
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const timeString = timeObject.toLocaleString("en-US", options);
  return timeString;
};

export const enrolledNullCheck = enrolled => {
  if (enrolled === null) return 0;
  return enrolled;
};

export const nullCheck = check => {
  if (check === null) return 0;
  return check;
};
