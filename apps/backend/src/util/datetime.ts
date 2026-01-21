import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const JST_TIMEZONE = "Asia/Tokyo";

export const nowJst = () => dayjs().tz(JST_TIMEZONE);
