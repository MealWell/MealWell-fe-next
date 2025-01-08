export type WeekdayT =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export const Weekdays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export type DeliveryTimeT = "morning" | "afternoon" | "evening";
export const DeliveryTimes = ["morning", "afternoon", "evening"];

export interface MVPPage {
  src: string;
  alt: string;
  width: number;
  height: number;
  description: React.ReactNode;
}