import { Routes } from '@angular/router';
import { BookTicketComponent } from './pages/book-ticket/book-ticket.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'search-result',
    component: SearchResultComponent,
  },
  {
    path: 'book-ticket',
    component: BookTicketComponent,
  },
  {
    path: 'my-bookings',
    component: MyBookingsComponent,
  },
  {
    path: '**',
    redirectTo: 'search',
  },
];
