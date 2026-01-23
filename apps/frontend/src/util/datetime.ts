const getJstFormatter = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", ...options });

export const nowJst = () => new Date();

export const getJstDateParts = (date: Date) => {
  const formatter = getJstFormatter({
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const getPart = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    year: getPart("year"),
    month: getPart("month"),
    day: getPart("day"),
    hour: getPart("hour"),
  };
};

export const getJstDateString = (date: Date) => {
  const { year, month, day } = getJstDateParts(date);
  return `${year}-${month}-${day}`;
};

export const buildBeatedAtIso = (startHour: number, date = nowJst()) => {
  const { year, month, day } = getJstDateParts(date);
  const hourText = String(startHour).padStart(2, "0");
  return `${year}-${month}-${day}T${hourText}:00:00+09:00`;
};
