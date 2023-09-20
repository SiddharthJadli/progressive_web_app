import { Component } from '@angular/core';
// import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  
  constructor(private dbService:DatabaseService){}

//   //create category object
//   saveCategory() {
//     let categoryObj = {
//       catId: this.catId,
//       name: this.name,
//       description: this.description,
//       image: this.image,
//       createdAt: this.createdAt,
//       createdAtFormatted: this.createdAtFormatted,
//       eventId: this.eventId,
//       //eventList:this.eventList
//     };
//     this.dbService.addCategory(categoryObj).subscribe({
//       next: (result) => {this.router.navigate(["/list-categories"])},
//       error: (error) => {console.log(error)}
//     })
//   }
}
//1.09 in wk9 lect