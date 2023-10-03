import { Component, OnInit } from "@angular/core";
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {
  categories: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {}
  

  onGetCategory() {
    console.log("from onGetCategory");

    return this.dbService.getCategory().subscribe((data: any) => {
      this.categories = data;
    });
  }

  onDeleteCategory(catId: string) {
    this.dbService.deleteCategory(catId).subscribe(result => {
      this.onGetCategory();
      this.ngOnInit();
      this.router.navigate(["/list-categories"]);
    });
  }
  ngOnInit() {
    this.onGetCategory();
  }


}
