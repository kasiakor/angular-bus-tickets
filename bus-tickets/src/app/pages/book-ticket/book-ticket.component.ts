import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBusScheduleResponse } from '../../interfaces/schedule.interface';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-book-ticket',
  imports: [DatePipe, CommonModule],
  templateUrl: './book-ticket.component.html',
  styleUrl: './book-ticket.component.css',
})
export class BookTicketComponent implements OnInit {
  private scheduleService = inject(ScheduleService);
  private activatedRoute = inject(ActivatedRoute);

  busSchedule: IBusScheduleResponse | null = null;
  scheduleId: number = 0;
  seatsToBook: number = 1;
  seats: any;
  selectedSeats: number[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log('params:', params);
      this.scheduleId = Number(params['scheduleId']);
    });

    this.loadBusSchedule();
  }

  loadBusSchedule() {
    this.scheduleService.getBusScheduleById(this.scheduleId).subscribe({
      next: (res) => {
        this.busSchedule = res;
        this.seatsToBook = res.totalSeats;
        this.seats = Array.from({ length: 20 }, (_, i) => ({
          number: i + 1,
          status: 'available',
        }));
        console.log('Bus scheduleId response:', res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleSeat(seat: any) {
    if (this.selectedSeats.includes(seat.number)) {
      this.selectedSeats = this.selectedSeats.filter((s) => s !== seat.number);
      seat.status = 'available';
    } else {
      this.selectedSeats.push(seat.number);
      seat.status = 'selected';
    }
  }
}
