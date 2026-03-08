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
        console.log('Bus scheduleId response:', res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
