export interface Reservation {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  userId: number | null;
  userFullName: string | null;
  doctorId: number;
  doctorFullName: string | null;
}
