import { useEffect, useState } from "react";

export function useCustomerCount() {
  const [count, setCount] = useState<number>(5413);
  const [formatted, setFormatted] = useState<string>("5,413+");

  useEffect(() => {
    // Base date: August 10, 2026 IST
    // Month in JS Date is 0-indexed, so 7 is August.
    // We use a specific timezone or just use local time and offset.
    // The safest is to calculate the time difference in days based on UTC or IST.
    // Since India is UTC+5:30, let's treat the date string in IST.
    const baseDate = new Date("2026-08-10T00:00:00+05:30");
    const now = new Date();
    
    // Calculate difference in days. To be safe with timezones, we can just take the difference 
    // in milliseconds and divide by a day's milliseconds.
    const diffTime = now.getTime() - baseDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // If it's before base date, we just use the base count
    const actualDays = Math.max(0, diffDays);
    const newCount = 5413 + (actualDays * 3);
    
    setCount(newCount);
    setFormatted(newCount.toLocaleString("en-IN") + "+");
  }, []);

  return { count, formatted };
}
