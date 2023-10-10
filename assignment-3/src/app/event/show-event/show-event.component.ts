import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent implements OnInit {
  events : any = [];

  constructor(private dbService : DatabaseService, private router: Router) {}
  
  ngOnInit() {
    this.onGetEvents();
  }   
    
  onGetEvents() {
    console.log("from onGetEvents");
    return this.dbService.getEvents().subscribe((data: any) => {
      this.events = data;
    });
  }
    
  onDisplayEvent(eventId: string) {
    this.dbService.displayEvent(eventId).subscribe(result => {
      this.onGetEvents();
      this.ngOnInit();
    });
  }
}
