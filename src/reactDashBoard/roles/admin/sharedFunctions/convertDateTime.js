// date = new Date().toISOString()
// time = (string) example: '10:00 pm'
// add = (number) example: 60
// extra = (number) example : 30
const convertDateTime = (date, time, add = null, extra = null) => {
  const finalStart = new Date(date);
  let hour = 0;
  let minutes = 0;
  if (time.indexOf("a") === -1) {
    hour += 12;
  }
  if (Number(time[0]) === 1) {
    hour += Number(`${time[0]}${time[1]}`);
    minutes += Number(`${time[3]}${time[4]}`);
  } else {
    hour += Number(time[0]);
    minutes += Number(`${time[2]}${time[3]}`);
  }
  if (add === null) {
    finalStart.setHours(hour);
    finalStart.setMinutes(minutes);
    finalStart.setSeconds(0);
  } else {
    let newMin = minutes;
    if (extra === null) {
      newMin += add;
    } else {
      newMin = newMin + add + extra;
    }
    const newHours = Math.floor(newMin / 60);
    const remander = newMin % 60;
    finalStart.setHours(hour + newHours);
    finalStart.setMinutes(remander);
    finalStart.setSeconds(0);
  }
  return finalStart;
};

export default convertDateTime;
