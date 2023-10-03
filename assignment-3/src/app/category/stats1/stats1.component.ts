import {Component} from '@angular/core';
import {DatabaseService} from 'src/app/services/database.service';

import { io } from 'socket.io-client';


@Component({
  selector: 'app-stats1', 
  templateUrl: './stats1.component.html', 
  styleUrls: ['./stats1.component.css']
})
export class Stats1Component {
    eventCount : number = 0;
    categoryCount : number = 0;
    socket: any;
    numbers: Array<number> = [];


    constructor(private dbService : DatabaseService, ) {
        this.socket = io();

    }

    
  }