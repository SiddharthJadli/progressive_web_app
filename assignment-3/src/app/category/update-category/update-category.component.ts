import {Component, OnInit} from '@angular/core';
import {DatabaseService} from 'src/app/services/database.service';
import {Router} from "@angular/router";


@Component({selector: 'app-update-category', templateUrl: './update-category.component.html', styleUrls: ['./update-category.component.css']})
export class UpdateCategoryComponent implements OnInit {
    CategoryID : string = "";
    name : string = "";
    description : string = "";
    image : string = "";
    selectedCategory : any;
    categories : any[] = [];
    

    constructor(private dbService : DatabaseService, private router : Router) {
        this.CategoryID = "";
    }

    onGetCategories() {
        console.log("From onGetCategories");

        return this.dbService.getCategory().subscribe((data : any) => {
            this.categories = data;
        });
    }

    onSelectUpdate(item : any) {
        console.log("selecting category==>", item);
        this.selectedCategory = item;
        this.name = item.name;
        this.description = item.description;
        this.image = item.image;
        this.CategoryID = item.catId;
    }

    onUpdateCategory() {
        console.log("Updating category==>", this.selectedCategory);
        const obj = {
            name: this.name,
            description: this.description,
            image: this.image,
            catId: this.CategoryID
        };

        this.dbService.updateCategory(this.CategoryID, obj).subscribe(result => {
            console.log("Category updated successfully:", result);

            this.onGetCategories();
            this.router.navigate(["/list-categories"]);
        });
    }

    ngOnInit() {
        this.onGetCategories();
    }
}
