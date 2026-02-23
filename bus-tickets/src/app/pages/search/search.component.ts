import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ILocation } from '../../interfaces/location.interface';
import { ISearch } from '../../interfaces/search.interface';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  locations: ILocation[] = [];
  today: string = new Date().toISOString().split('T')[0];

  searchObj: ISearch = {
    fromLocationId: '',
    toLocationId: '',
    travelDate: '',
  };

  private locationService = inject(LocationService);
  private router = inject(Router);

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

  onBusSearch() {
    console.log(this.searchObj);
    this.router.navigate([
      '/search-result',
      this.searchObj.fromLocationId,
      this.searchObj.toLocationId,
      this.searchObj.travelDate,
    ]);
  }
}
