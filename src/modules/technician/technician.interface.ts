export interface ITechnicianProfile {
  bio?: string;
  experience?: number;
  hourlyRate?: number;
  location?: string     

}
export interface ITechnicianQuery {
    name?: string
    location?:string
    isAvailable?: boolean
    search?: string
    sortOrder?: string
    sortBy?: string
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