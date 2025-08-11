export interface Cycle {
  id: string;
  name: string;
  description: string;
  country: string;
  status: "ACTIVE" | "CLOSED"; // Assuming these are the possible API statuses
  startDate?: string;
  endDate?: string;
}
