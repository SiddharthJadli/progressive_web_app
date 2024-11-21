import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router from @angular/router
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})

export class UpdateEventComponent implements OnInit {
  events: any[] = [];
  eventID: string = "";
  name: string = "";
  capacity: any;
  selectedEvent: any;

  constructor(private dbService: DatabaseService, private router: Router) {
  }

  onGetEvents() {
    console.log("From onGetEvents");

    return this.dbService.getEvents().subscribe((data: any) => {
      this.events = data;
    });
  }

  onSelectUpdate(item: any) {
    console.log("selecting event ==>", item);

    this.selectedEvent = item;
    this.name = item.name;
    this.capacity = item.capacity;
    this.eventID = item.eventId; 
  }

  onUpdateEvent() {
    console.log("Updating event ==>", this.selectedEvent);

    const obj = {
      eventID: this.eventID,
      name: this.name,
      capacity: this.capacity,
    };

    // Use the correct method and pass the eventID
    this.dbService.updateEvent(this.eventID, obj).subscribe(result => {
      console.log("Event updated successfully:", result);

      this.onGetEvents();
      this.router.navigate(["/list-events"]);
    });
  }

  ngOnInit() {
    this.onGetEvents();
  }
}
