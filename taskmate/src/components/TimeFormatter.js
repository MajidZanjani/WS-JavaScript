export const TimeFormatter = (inputTime) => {
  let result;
  if (inputTime.search('T') !== -1) {
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
    const [hour, minute] = time.split(':');
    const [day, month, year] = date.split('/');
    const isPM = apm === 'PM';
    const formattedHour = isPM
      ? (parseInt(hour, 10) + 12).toString().padStart(2, '0')
      : hour;
    result = `${year}-${month}-${day}T${formattedHour}:${minute}`;
  }

  return result;
};
