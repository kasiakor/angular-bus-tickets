import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IBusBookingPassenger } from '../../interfaces/bus.interface';
import { IBusScheduleResponse } from '../../interfaces/schedule.interface';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-book-ticket',
  imports: [DatePipe, CommonModule, FormsModule],
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
  passengers: IBusBookingPassenger[] = [];

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
        this.seats = Array.from({ length: this.seatsToBook }, (_, i) => ({
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
    this.buildPassengers(); // rebuild passenger forms
  }

  buildPassengers() {
    this.passengers = this.selectedSeats.map((seat) => ({
      passengerId: 0,
      bookingId: 0,
      passengerName: '',
      age: 0,
      gender: '',
      seatNo: seat,
    }));
  }
}
