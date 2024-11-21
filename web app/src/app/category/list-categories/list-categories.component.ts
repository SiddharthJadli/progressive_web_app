import {Component, OnInit } from '@angular/core';
import {DatabaseService} from 'src/app/services/database.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-list-categories', 
    templateUrl: './list-categories.component.html', 
    styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit  {
    categories : any = [];

   
    constructor(private dbService : DatabaseService, private router: Router) {
        this.getCategories();
    }
    ngOnInit(): void {
        this.getCategories();
    }
    getCategories() {
        this.dbService.getCategory().subscribe({
            next: (data: any) => {
                this.categories = data;

            },
            error: (err)=> { }
        })
    }

}
