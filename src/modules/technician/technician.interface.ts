export interface ITechnicianProfile {
  bio?: string;
  experience?: number;
  hourlyRate?: number;
}

export enum  IStatus {
  "ACCEPTED",
  "DECLINED" , 
  "COMPLETED"
}
export enum DayOfWeek {
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY"
}