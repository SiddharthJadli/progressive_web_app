import { Component, OnInit } from "@angular/core";
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {
  events: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {}
  

  onGetEvent() {
    console.log("from onGetEvent");

    return this.dbService.getEvents().subscribe((data: any) => {
      this.events = data;
    });
  }

  onDeleteEvent(eventId: string) {
    this.dbService.deleteEvent(eventId).subscribe(result => {
      this.onGetEvent();
      this.ngOnInit();
      this.router.navigate(["/list-events"]);
    });
  }
  
  ngOnInit() {
    this.onGetEvent();
  }


}
