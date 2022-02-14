import { utcToZonedTime, format } from "date-fns-tz";

const timeZone = "Asia/Seoul";

export function makeLocalTime(date) {
  const timeInSeoul = utcToZonedTime(date, timeZone);
  const result = format(timeInSeoul, "HH");

  return result;
}

export function makeLocalDate(date) {
  const timeInSeoul = utcToZonedTime(date, timeZone);
  const result = format(timeInSeoul, "yyyy.MM.dd(eee)");

  return result;
}
