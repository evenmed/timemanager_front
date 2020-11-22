import maybeAddTrailingZero from "./maybeAddTrailingZero";

/**
 * Takes in an amount of minutes returns a time string (HH:MM)
 * @param {Number} totalMins (Integer) amount of minutes
 * @return {String} Time string (HH:MM)
 */
export default function minutesToTimeString(totalMins) {
  if (`${parseInt(totalMins)}` !== `${totalMins}` || totalMins < 0) return "";

  if (totalMins > 1440) {
    console.error(
      "minutesToTimeString: Minutes can't be above 1440 (24 hours)"
    );
    return "";
  }
  let minutes = maybeAddTrailingZero(totalMins % 60);
  let hours = maybeAddTrailingZero(Math.floor(totalMins / 60));

  return `${hours}:${minutes}`;
}
