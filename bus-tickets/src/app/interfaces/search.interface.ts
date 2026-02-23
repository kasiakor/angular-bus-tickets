export interface ISearch {
  fromLocationId: string;
  toLocationId: string;
  travelDate: string;
}

export interface IBusSearchResponse {
  availableSeats: number;
  totalSeats: number;
  price: number;
  arrivalTime: string;
  scheduleId: number;
  departureTime: string;
  busName: string;
  busVehicleNo: string;
  fromLocationName: string;
  toLocationName: string;
  vendorName: string;
  scheduleDate: string;
  vendorId: number;
}
