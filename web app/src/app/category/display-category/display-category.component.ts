import {Component, OnInit} from '@angular/core';
import {DatabaseService} from 'src/app/services/database.service';
import {ActivatedRoute} from "@angular/router";


@Component({selector: 'app-display-category', templateUrl: './display-category.component.html', styleUrls: ['./display-category.component.css']})
export class DisplayCategoryComponent implements OnInit {
    categories : any = [];
    events : any = [];


    constructor(private dbService : DatabaseService, private router : ActivatedRoute) {}

    ngOnInit() {
        const catId = this.router.snapshot.paramMap.get('catId');
        console.log('catId:', catId);
        if (catId) {
            this.onDisplayCategory(catId);
        }
    }

    onDisplayCategory(catId : string) { // Fetch both category and event data
        this.dbService.displayCategory(catId).subscribe((data : any) => {
            this.categories = data.category;
            this.events = data.events;


            console.log(this.events);
        });
    }
}
