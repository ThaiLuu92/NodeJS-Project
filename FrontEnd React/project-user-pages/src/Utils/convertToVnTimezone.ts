import { format } from "date-fns-tz";


export const convertToVnTimezone = (date: any) => {
    console.log(111111,date);
    return format(date, "yyyy-mm-dd");
  };