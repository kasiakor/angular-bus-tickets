import { Component, inject, OnInit } from '@angular/core';
import { ILocation } from '../../interfaces/location.interface';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  locations: ILocation[] = [];
  today: string = new Date().toISOString().split('T')[0];

  private locationService = inject(LocationService);

  ngOnInit(): void {
    this.loadAllLocations();
    console.log(this.today);
  }

  loadAllLocations() {
    this.locationService.getAllLocations().subscribe({
      next: (res) => {
        this.locations = res;
        console.log(this.locations);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
