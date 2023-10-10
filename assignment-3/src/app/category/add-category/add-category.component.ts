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
    if (this.alphanumericName()) {
    let categoryObj = {
      name: this.name,
      description: this.description,
      image: this.image,
    };
    
    this.dbService.addCategory(categoryObj).subscribe({
      next: (result) => {this.router.navigate(["/list-categories"])},
      error: (error) => {console.log(error)}
    });

  } else {
    this.router.navigate(['/invalid-data']);
  }
  }

  alphanumericName() {
    const nospace = this.name.replace(/\s/g, '');
    return /^[a-zA-Z0-9]*$/.test(nospace);
  }
}