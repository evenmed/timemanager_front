/**
 * Takes in a string in HH:MM format and returns it in
 * "HH hours and MM minutes" format
 *
 * @param {String} str time string in HH:MM format
 *
 * @returns {String} string in "HH hours and MM minutes" format
 */
const readableTimeString = (str) => {
  if (!/^[0-2][0-9]:[0-5][0-9]$/.test(str)) return "";

  const [hours, minutes] = str.split(":").map((val) => parseInt(val));

  let readableString = "";

  if (hours > 0) readableString += `${hours} hours`;

  if (minutes > 0 && hours > 0) readableString += ` and ${minutes} minutes`;
  else if (minutes > 0) readableString += `${minutes} minutes`;

  return readableString;
};

export default readableTimeString;
