import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from '../interfaces/location.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}
  getAllLocations(): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(
      'https://api.freeprojectapi.com/api/BusBooking/GetBusLocations',
    );
  }
}
