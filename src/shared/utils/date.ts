export interface FormatDateTimeOptions {
  timeZone?: string;
}

export function formatDateTime(
  date: Date | string,
  options: FormatDateTimeOptions = {}
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  
  if (isNaN(d.getTime())) {
    return "";
  }

  const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: options.timeZone,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Example output for en-IN with these options: "01-Aug-2026, 2:24 pm"
  // Let's manually construct to ensure exact "01-Aug-2026 02:24 PM" format if Intl varies across Node versions.
  
  const parts = formatter.formatToParts(d);
  const getPart = (type: string) => parts.find(p => p.type === type)?.value || "";
  
  const day = getPart("day");
  const month = getPart("month");
  const year = getPart("year");
  const hour = getPart("hour");
  const minute = getPart("minute");
  const dayPeriod = getPart("dayPeriod").toUpperCase();

  return `${day}-${month}-${year} ${hour}:${minute} ${dayPeriod}`;
}
