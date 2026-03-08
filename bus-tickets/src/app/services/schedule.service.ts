import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBusScheduleResponse } from '../interfaces/schedule.interface';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  getBusScheduleById(scheduleId: number): Observable<IBusScheduleResponse> {
    return this.http.get<IBusScheduleResponse>(
      `https://api.freeprojectapi.com/api/BusBooking/GetBusScheduleById?id=${scheduleId}`,
    );
  }
}
