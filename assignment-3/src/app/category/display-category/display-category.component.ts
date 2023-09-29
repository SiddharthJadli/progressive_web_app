import { Component, OnInit } from '@angular/core';
import {DatabaseService} from 'src/app/services/database.service';


@Component({
  selector: 'app-display-category',
  templateUrl: './display-category.component.html',
  styleUrls: ['./display-category.component.css']
})
export class DisplayCategoryComponent implements OnInit {
  categories : any = [];
  events : any = [];

  constructor(private dbService : DatabaseService) {}
  ngOnInit(): void {
    this.getCategories();
    // this.getEvents();
}
getCategories() {
  this.dbService.getCategory().subscribe({
      next: (data: any) => {
          this.categories = data;
      },
      error: (err)=> {}
  });
}

// getEvents() {
//   this.dbService.getEvent().subscribe({
//       next: (data: any) => {
//           this.events = data;
//       },
//       error: (err)=> {}
//   });
// }

}
