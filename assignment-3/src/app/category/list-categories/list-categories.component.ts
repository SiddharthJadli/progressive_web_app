import {Component } from '@angular/core';
import {DatabaseService} from 'src/app/services/database.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-list-categories', 
    templateUrl: './list-categories.component.html', 
    styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent  {
    categories : any = [];

   
    constructor(private dbService : DatabaseService, private router: Router) {
        this.getCategories();
    }
    // ngOnInit() {
    //     this.storeCat();
    // }
    getCategories() {
        this.dbService.getCategory().subscribe({
            next: (data: any) => {
                this.categories = data;
            },
            error: (err)=> { }
        })
    }

    // storeCat() {
    //     this.dbService.getCategory().subscribe((data: any) => {
    //         this.categories = data;
    //         this.categories.forEach((category: any) => {
    //             this.getCategoryEventCount(category.catId);
    //         });
    //     });
    // }

    // getCategoryEventCount(catId: string) {
    //     this.dbService.getEventCountForCategory(catId).subscribe((data: any) => {
    //         const changeCat = this.categories.find((category: any) => category.catId === catId);
    //         if (changeCat) {
    //             changeCat.eventsCount = data.count;
    //         }
    //     });
    // }

//     onDisplayCategory(catId: string) {
//         this.router.navigate(['/display-category/', catId]);
// }


}
