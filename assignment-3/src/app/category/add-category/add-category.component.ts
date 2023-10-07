import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  name: string = "";
  description: string = "";
  image: string = "";
  
  constructor(private dbService:DatabaseService, private router: Router){}

  //create category object
  saveCategory() {
    let categoryObj = {
      name: this.name,
      description: this.description,
      image: this.image,
    };
    
    this.dbService.addCategory(categoryObj).subscribe({
      next: (result) => {this.router.navigate(["/list-categories"])},
      error: (error) => {console.log(error)}
    })
  }
}