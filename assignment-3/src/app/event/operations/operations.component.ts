import { Component, OnInit } from '@angular/core';
import {DatabaseService} from 'src/app/services/database.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})

export class OperationsComponent implements OnInit {
  addCount: number = 0;
  updateCount: number = 0;
  deleteCount: number = 0;

  constructor(private dbService: DatabaseService) {}

  ngOnInit() {
    this.fetchOperationCounts();
  }

  fetchOperationCounts() {
    // Use your operations service to fetch the counts from the backend
    this.dbService.getAddCount().subscribe((data: any) => {
      this.addCount = data.count;
    })

    this.dbService.getUpdateCount().subscribe((data: any) => {
      this.updateCount = data.count;
    })

    this.dbService.getDeleteCount().subscribe((data: any) => {
      this.deleteCount = data.count;
    })
  }
}