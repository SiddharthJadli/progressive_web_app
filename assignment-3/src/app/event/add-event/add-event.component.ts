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
    if (this.isDataValid()) {
      let eventObj = {
        name: this.name,
        description: this.description,
        image: this.image,
        startTime: this.startDateTime,
        duration: this.duration,
        isActive: this.isActive,
        capacity: this.capacity,
        availableTickets: this.ticketsAvailable, 
        categories: this.categoryID,
      };
      
      console.log(eventObj);

      this.dbService.addEvent(eventObj).subscribe({
        next: (result) => {this.router.navigate(["/list-events"])},
        error: (error) => {console.log(error)}
      })
    } else {
      // Data is not valid, navigate to the "InvalidData" component
      this.router.navigate(['/invalid-data']);
    }
  }

  private isDataValid(): boolean {
    const isNameValid = this.name.trim() !== '';
  
    // Validate Start Time
    const isValidStartTime = !isNaN(Date.parse(this.startDateTime.toString()));
  
    // Validate Duration
    const isValidDuration = /^\d+$/.test(this.duration.toString()) && this.duration > 0; 
  
    // Validate Capacity (if provided)
    const isValidCapacity = !this.capacity || (/^\d+$/.test(this.capacity.toString()) && this.capacity >= 10 && this.capacity <= 2000);
  
    // Validate Available Tickets (if provided)
    const isValidAvailableTickets = !this.ticketsAvailable || (/^\d+$/.test(this.ticketsAvailable.toString()) && this.ticketsAvailable <= this.capacity);
  
    // Return true if all validations pass
    return isNameValid && isValidStartTime && isValidDuration && isValidCapacity && isValidAvailableTickets;
  }
  
}








