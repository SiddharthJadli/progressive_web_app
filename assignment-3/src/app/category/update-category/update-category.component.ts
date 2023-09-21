import {Component, OnInit} from '@angular/core';
import {DatabaseService} from 'src/app/services/database.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit{
  name: string = "";
  description: string = "";
  CategoryID: string = "";

  categories : any[] = [];

    constructor(private categoryService : DatabaseService, private router: Router) {}
  
    onGetCategories() {
      console.log("From on GetCategories");
  
      return this.categoryService.getCategory().subscribe((data: any) => {
        this.categories = data;
      });
    }
  
    // Update an Category
    onSelectUpdate(item: any) {
      this.name = item.name;
      this.description = item.description;
      this.CategoryID = item._id;
    }
    onUpdateCategory() {
      this.categoryService.updateCategory(this.CategoryID, this.name).subscribe(result => {
        this.onGetCategories();
        this.router.navigate(["/list-categories"]);
      });
    }
    ngOnInit() {
      this.onGetCategories();
    }
}
