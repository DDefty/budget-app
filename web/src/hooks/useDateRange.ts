import { useState } from "react";

export type DateRange = { startDate: Date | null; endDate: Date | null };

export function useDateRange(initialStart: Date | null = new Date(), initialEnd: Date | null = new Date()) {
  const [value, setValue] = useState<DateRange>({ startDate: initialStart, endDate: initialEnd });
  return { value, setValue };
}