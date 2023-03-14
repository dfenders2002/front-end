export function convertTotalTimeToHours(totalTime) {
  const [hours, minutes, seconds] = totalTime.split(":").map(Number);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const hoursDecimal = totalSeconds / 3600;
  return +hoursDecimal.toFixed(1);
}


export function calculateTotalHours(activities) {
  const totalHours = activities.reduce((sum, activity) => {
    const hours = convertTotalTimeToHours(activity.totalTime);
    return sum + hours;
  }, 0);

  return totalHours;
}

export function createTimeObjects(datePickerDate, timeFrom, timeTo) {
  const year = datePickerDate.$y;
  const month = datePickerDate.$M;
  const day = datePickerDate.$D;

  const timeFromDate = new Date(Date.UTC(year, month, day, timeFrom.$H, timeFrom.$m)).toISOString();
  const timeToDate = new Date(Date.UTC(year, month, day, timeTo.$H, timeTo.$m)).toISOString();

  return { timeFrom: timeFromDate, timeTo: timeToDate };
}

export function totalHoursLastWeek(activities) {
  const moment = require('moment');
  // Het beginpunt van de week is zondag
  const startOfWeek = moment().subtract(1, 'week').startOf('week');

  // Het eindpunt van de week is zaterdag
  const endOfWeek = moment().subtract(1, 'week').endOf('week');

  // Filter activiteiten van vorige week op basis van start en einddatum
  const activitiesLastWeek = activities.filter(activity => moment(activity.startTime).isBetween(startOfWeek, endOfWeek));
  let totalTimeLastWeek = moment.duration(0);
  activitiesLastWeek.forEach(activity => {
    totalTimeLastWeek.add(moment.duration(activity.totalTime));
  });
  return totalTimeLastWeek._data.hours;
}