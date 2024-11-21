import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent implements OnInit {
  event : any = [];

  constructor(private dbService : DatabaseService, private router: ActivatedRoute) {}
  
  ngOnInit() {
    const eventId = this.router.snapshot.paramMap.get('eventId');
    this.onGetEvent(eventId);
  }   
    
  onGetEvent(eventId: any) {
    return this.dbService.displayEvent(eventId).subscribe((data: any) => {
      console.log(data[0]);
      this.event = data[0];
    });
  }
}
