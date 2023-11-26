export const TimeFormatter = (inputTime) => {
  let result;
  if (typeof inputTime === 'object') {
    const dDate = inputTime.toLocaleDateString();
    const dTime = inputTime.toLocaleTimeString();
    let [month, day, year] = dDate.split('/');
    let [hour, minute] = dTime.split(':');
    if (dTime.search('PM') !== -1) {
      hour = (parseInt(hour) + 12).toString();
    }
    result = `${year}-${month}-${day}T${hour}:${minute}`;
  } else if (inputTime.search('T') !== -1) {
    const parsedTime = new Date(inputTime);
    const hours = parsedTime.getHours();
    const minutes = parsedTime.getMinutes();
    const seconds = parsedTime.getSeconds();
    const formattedTime = `${hours % 12 || 12}:${
      minutes < 10 ? '0' : ''
    }${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${
      hours >= 12 ? 'PM' : 'AM'
    }`;
    const day = parsedTime.getDate();
    const month = parsedTime.getMonth() + 1;
    const year = parsedTime.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    result = `${formattedTime} ${formattedDate}`;
  } else {
    const [time, apm, date] = inputTime.split(' ');
    let [hour, minute] = time.split(':');
    let [day, month, year] = date.split('/');
    if (apm === 'PM') {
      hour = (parseInt(hour) + 12).toString();
    }
    if (day.length === 1) {
      day = '0' + day;
    }
    if (month.length === 1) {
      month = '0' + month;
    }
    result = `${year}-${month}-${day}T${hour}:${minute}`;
  }

  return result;
};
