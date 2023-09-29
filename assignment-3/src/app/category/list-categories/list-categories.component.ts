import {Component} from '@angular/core';
import {DatabaseService} from 'src/app/services/database.service';

@Component({
    selector: 'app-list-categories', 
    templateUrl: './list-categories.component.html', 
    styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent {
    categories : any = [];


    constructor(private dbService : DatabaseService) {
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
