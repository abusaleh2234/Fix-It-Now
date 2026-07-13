export interface ITechnicianProfile {
  bio?: string;
  experience?: number;
  hourlyRate?: number;
  location?: string     

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