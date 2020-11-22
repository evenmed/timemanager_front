import minsToString from "./minutesToTimeString";
import minutesToHours from "./minutesToHours";

/**
 * Parses events from API to be displayed in the calendar and calculates the
 * total time worked for each date
 *
 * @param {Object[]} events Events array as returned from API
 *
 * @return {[Object[], Object]} An array with a list of fullcalendar-friendly
 * events as its first entry and an object with the total minutes worked by
 * date as the second entry
 */
export default function parseEvents(events) {
  let totalMinsByDate = {};
  let eventStartByDate = {};

  if (!events || !events.length) return [[], totalMinsByDate];

  const parsedEvents = events.map(({ _id, date, title, time, notes }) => {
    if (!totalMinsByDate[date]) totalMinsByDate[date] = 0;
    totalMinsByDate[date] += parseInt(time);

    const startMins = eventStartByDate[date] || 0;
    let endMins = parseInt(startMins) + parseInt(time);

    if (endMins < 1440) eventStartByDate[date] = endMins;
    else endMins = 1440;

    return {
      id: _id,
      start: `${date}T${minsToString(startMins)}:00`,
      end: `${date}T${minsToString(endMins)}:00`,
      title: `(${minutesToHours(time)} h) ${title}`,
      extendedProps: { notes },
    };
  });

  return [parsedEvents, totalMinsByDate];
}
