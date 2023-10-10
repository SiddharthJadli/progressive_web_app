import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ListCategoriesComponent } from './category/list-categories/list-categories.component';
import { DeleteCategoryComponent } from './category/delete-category/delete-category.component';
import { DisplayCategoryComponent } from './category/display-category/display-category.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SpeechComponent } from './category/speech/speech.component';
import { Stats1Component } from './category/stats1/stats1.component';



import {RouterModule, Routes} from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { DatabaseService } from './services/database.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { CapitalPipe } from './pipes/capital.pipe';

import { AddEventComponent } from './event/add-event/add-event.component';
import { DeleteEventComponent } from './event/delete-event/delete-event.component';
import { ListEventsComponent } from './event/list-events/list-events.component';
import { InvalidDataComponent } from './event/invalid-data/invalid-data.component';
import { UpdateEventComponent } from './event/update-event/update-event.component';
import { FormatMinutesPipe } from './pipes/format-minutes.pipe';
import { OperationsComponent } from './event/operations/operations.component';

const routes: Routes = [
  {path:"add-category", component:AddCategoryComponent},
  {path:"list-categories", component:ListCategoriesComponent},
  {path:"delete-category", component:DeleteCategoryComponent},
  {path:"display-category/:catId", component:DisplayCategoryComponent},
  {path:"display-category/", component:DisplayCategoryComponent},
  {path:"update-category", component:UpdateCategoryComponent},
  {path:"speech", component:SpeechComponent},
  {path:"stats1", component:Stats1Component},
  {path:"add-event", component:AddEventComponent},
  {path:"invalid-data", component:InvalidDataComponent},
  {path:"list-events", component:ListEventsComponent},
  {path:"delete-event", component:DeleteEventComponent},
  {path:"update-event", component:UpdateEventComponent},
  // {path:"delete-event", component:tranl},
  {path:"operations", component:OperationsComponent},


  {path:'', pathMatch: 'full', redirectTo: 'add-category'},
  {path:"**", component:PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    ListCategoriesComponent,
    DeleteCategoryComponent,
    DisplayCategoryComponent,
    UpdateCategoryComponent,
    PageNotFoundComponent,
    FooterComponent,
    SpeechComponent,
    Stats1Component,
    CapitalPipe,
    AddEventComponent,
    DeleteEventComponent,
    ListEventsComponent,
    InvalidDataComponent,
    UpdateEventComponent,
    FormatMinutesPipe,
    OperationsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes,{useHash:true}), 
    HttpClientModule,
    FormsModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: !isDevMode(),
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // }),
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
