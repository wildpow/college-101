// date = new Date().toISOString()
// time = string '10:00 pm'
// index = number
// arr = [{time: 60}, {time: 90}]
const convertDateTime = (date, time, index, arr) => {
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
  if (arr === undefined) {
    finalStart.setHours(hour);
    finalStart.setMinutes(minutes);
    finalStart.setSeconds(0);
  } else {
    if (arr[index].time === 60) {
      finalStart.setHours(hour + 1);
      finalStart.setMinutes(minutes);
      finalStart.setSeconds(0);
    }
    if (arr[index].time === 90 || arr[index].time === 120) {
      const newMin = minutes + arr[index].time;
      const newHours = Math.floor(newMin / 60);
      const remander = newMin % 60;
      finalStart.setHours(hour + newHours);
      finalStart.setMinutes(remander);
      finalStart.setSeconds(0);
    }
  }
  return finalStart;
};

export default convertDateTime;
