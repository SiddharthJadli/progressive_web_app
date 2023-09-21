import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ListCategoriesComponent } from './category/list-categories/list-categories.component';
import { DeleteCategoryComponent } from './category/delete-category/delete-category.component';
import { DisplayCategoryComponent } from './category/display-category/display-category.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';

import {RouterModule, Routes} from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { DatabaseService } from './services/database.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path:"add-category", component:AddCategoryComponent},
  {path:"list-categories", component:ListCategoriesComponent},
  {path:"delete-category", component:DeleteCategoryComponent},
  {path:"display-category", component:DisplayCategoryComponent},
  {path:"update-category", component:UpdateCategoryComponent},
  { path: '', pathMatch: 'full', redirectTo: 'add-category' },
  {path:"*", component:PageNotFoundComponent}]



@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    ListCategoriesComponent,
    DeleteCategoryComponent,
    DisplayCategoryComponent,
    UpdateCategoryComponent,
    PageNotFoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(routes,{useHash:true}), 
    HttpClientModule,
    FormsModule,
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
