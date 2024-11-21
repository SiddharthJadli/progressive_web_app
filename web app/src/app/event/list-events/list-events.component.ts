import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})

export class ListEventsComponent {
  events : any = [];

  constructor(private dbService : DatabaseService, private router: Router) {
    this.getEvents();
  }

  getEvents() {
    this.dbService.getEvents().subscribe({
      next: (data: any) => {
        this.events = data;
      },
      error: (err)=> { }
    })
  }

  onDisplayEvent(eventId: string) {
    this.router.navigate(['/display-event/' + eventId]);
  }
}
