import {Component, OnInit} from '@angular/core';
import {DatabaseService} from 'src/app/services/database.service';
<<<<<<< HEAD

// import { io } from 'socket.io-client';
=======
import {Router} from "@angular/router";
>>>>>>> master


@Component({selector: 'app-stats1', templateUrl: './stats1.component.html', styleUrls: ['./stats1.component.css']})
export class Stats1Component implements OnInit {
    eventCount : number = 0;
    categoryCount : number = 0;
    categoryEventCount: number = 0;

    numbers : Array < number > = [];
   


<<<<<<< HEAD
    // constructor(private dbService : DatabaseService, ) {
    //     this.socket = io();
    // }
}
=======
    constructor(private dbService : DatabaseService, private router : Router) {}
    ngOnInit() {
      this.getEventCount();
      this.getCategoryCount();
  }
  
  getEventCount() {
      return this.dbService.getEventCount().subscribe((data : any) => {
          this.eventCount = data.count;
      });
  }
  
  getCategoryCount() {
      return this.dbService.getCategoryCount().subscribe((data : any) => {
          this.categoryCount = data.count;
      });
  }

//   getCategoryEventCount(catId: string) {
//     return this.dbService.getEventCountForCategory(catId).subscribe((data: any) => {
//       this.categoryEventCount = data.count;
//     });
//   }
  
  
}


>>>>>>> master
