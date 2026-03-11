import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBusBooking } from '../interfaces/bus.interface';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  createNewBooking(bookingData: IBusBooking) {
    return this.http.post<IBusBooking>(
      'https://api.freeprojectapi.com/api/BusBooking/PostBusBooking',
      bookingData,
    );
  }
}
