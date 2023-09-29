import {Component, OnInit} from '@angular/core';
import {DatabaseService} from 'src/app/services/database.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-stats1', 
  templateUrl: './stats1.component.html', 
  styleUrls: ['./stats1.component.css']
})
export class Stats1Component implements OnInit {
    eventCount : number = 0;
    categoryCount : number = 0;

    constructor(private dbService : DatabaseService, private router : Router) {}

    getEventCount() {
        return this.dbService.getCategoryCount().subscribe((data : any) => {
            this.eventCount = data.count;
        });
    }

    getCategoryCount() {
        return this.dbService.getEventCount().subscribe((data : any) => {
            this.categoryCount = data.count;
        });
    }

    ngOnInit() {
        this.getEventCount();
        this.getCategoryCount();
    }

}
