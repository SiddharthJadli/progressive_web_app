import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})

export class AddEventComponent {
  name: string = "";
  description: string = "";
  image: string = "";
  startDateTime: Date = new Date();
  duration: number= 0;
  isActive: boolean = true;
  capacity: number=1000;
  ticketsAvailable: number=this.capacity;
  categoryID: string="";
  
  constructor(private dbService:DatabaseService, private router: Router){}

  //create event object
  saveEvent() {
    let eventObj = {
      name: this.name,
      description: this.description,
      image: this.image,
      startTime: this.startDateTime,
      duration: this.duration,
      isActive: this.isActive,
      capacity: this.capacity,
      availableTickets: this.ticketsAvailable, 
      categoryID: this.categoryID,
    };
    
    console.log(eventObj);

    this.dbService.addEvent(eventObj).subscribe({
      next: (result) => {this.router.navigate(["/list-events"])},
      error: (error) => {console.log(error)}
    })
  }
}
