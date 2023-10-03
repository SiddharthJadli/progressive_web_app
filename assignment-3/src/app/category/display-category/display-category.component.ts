import {Component, OnInit} from '@angular/core';
import {DatabaseService} from 'src/app/services/database.service';
import { Router } from "@angular/router";


@Component({selector: 'app-display-category', templateUrl: './display-category.component.html', styleUrls: ['./display-category.component.css']})
export class DisplayCategoryComponent implements OnInit {
    categories : any = [];
    events : any = [];
    displayedCategory: any;

    constructor(private dbService : DatabaseService, private router: Router) {}
    ngOnInit() {
      this.onGetCategory();
      // this.getEvents();
    }
        
    
    onGetCategory() {
      console.log("from onGetCategory");
      return this.dbService.getCategory().subscribe((data: any) => {
        this.categories = data;
      });
    }
    
    onDisplayCategory(catId: string) {
      this.dbService.displayCategory(catId).subscribe(result => {
        this.onGetCategory();
        this.ngOnInit();
      });
    }
    
  

        // getEvents() {
        // this.dbService.getEvent().subscribe({
        //       next: (data: any) => {
        //           this.events = data;
        //       },
        //       error: (err)=> {}
        // });
        // }

    }
