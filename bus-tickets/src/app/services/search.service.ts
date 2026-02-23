import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBusSearchResponse } from '../interfaces/search.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchBus(
    fromLocation: number,
    toLocation: number,
    travelDate: string,
  ): Observable<IBusSearchResponse> {
    return this.http.get<IBusSearchResponse>(
      'https://api.freeprojectapi.com/api/BusBooking/searchBus2?fromLocation=' +
        fromLocation +
        '&toLocation=' +
        toLocation +
        '&travelDate=' +
        travelDate,
    );
  }
}
