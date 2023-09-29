import {Component, OnInit} from '@angular/core';
import {DatabaseService} from 'src/app/services/database.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit{
  CategoryID: string = "";
  name: string = "";
  description: string = "";
  image: string = "";

  categories : any[] = [];

    constructor(private categoryService : DatabaseService, private router: Router) {}
  
    onGetCategories() {
      console.log("From on GetCategories");
  
      return this.categoryService.getCategory().subscribe((data: any) => {
        this.categories = data;
      });
    }
  
    // Update an Category
    onSelectUpdate(catId: string) {
      console.log("Updating category...");

      this.CategoryID = catId;
      const selectedCat = this.categories.find(category =>category.catId===this.CategoryID);
      if(selectedCat) {
        this.name = selectedCat.name;
        this.description = selectedCat.description;
        this.image = selectedCat.image;
      }
    }
    onUpdateCategory() {
      let obj = { name: this.name, description: this.description, image: this.image };

      this.categoryService.updateCategory(this.CategoryID, obj).subscribe(result => {
        console.log("Category updated successfully:", result);

        this.onGetCategories();
        this.router.navigate(["/list-categories"]);
      });
    }
    ngOnInit() {
      this.onGetCategories();
    }
}
