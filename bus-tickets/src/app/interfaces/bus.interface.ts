export interface IBusBooking {
  bookingId: number;
  custId: number;
  bookingDate: string;
  scheduleId: number;
  busBookingPassengers: IBusBookingPassenger[];
}

export interface IBusBookingPassenger {
  passengerId: number;
  bookingId: number;
  passengerName: string;
  age: number;
  gender: string;
  seatNo: number;
}
