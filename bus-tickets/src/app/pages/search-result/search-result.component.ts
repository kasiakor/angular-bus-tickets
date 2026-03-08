import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBusSearchResponse, ISearch } from '../../interfaces/search.interface';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-result',
  imports: [DatePipe],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
})
export class SearchResultComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private searchService = inject(SearchService);
  private router = inject(Router);

  searchObj: ISearch = {
    fromLocationId: '',
    toLocationId: '',
    travelDate: '',
  };

  searchResult: IBusSearchResponse[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log('params:', params);
      this.searchObj.fromLocationId = params['fromLocationId'];
      this.searchObj.toLocationId = params['toLocationId'];
      this.searchObj.travelDate = params['travelDate'];
    });

    this.loadSearchResult();
  }

  loadSearchResult() {
    this.searchService
      .searchBus(
        Number(this.searchObj.fromLocationId),
        Number(this.searchObj.toLocationId),
        this.searchObj.travelDate,
      )
      .subscribe({
        next: (res) => {
          this.searchResult = res;
          console.log('search result:', this.searchResult);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  navigateToBooking(scheduleId: number) {
    console.log('Navigating to booking with scheduleId:', scheduleId);
    this.router.navigate(['/book-ticket', scheduleId]);
  }
}
