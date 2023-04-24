export interface Reservation {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  userId: number | null;
  doctorId: number;
}
