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