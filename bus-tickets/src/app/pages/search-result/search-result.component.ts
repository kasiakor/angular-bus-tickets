import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBusSearchResponse, ISearch } from '../../interfaces/search.interface';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-result',
  imports: [],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
})
export class SearchResultComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private searchService = inject(SearchService);

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
          console.log('search result:', res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
