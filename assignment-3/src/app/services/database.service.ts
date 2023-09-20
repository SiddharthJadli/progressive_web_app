import { Injectable } from '@angular/core';
import{HttpClient} from "@angular/common/http"

// const httpOptions = {
//   headers: new HttpHeaders({ "Content-Type": "application/json" }),
// };

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  // getCategory(){
  //   return this.http.get('/add-category')
  // }

  // addCategory(aCategory: any){
  //   return this.http.post("/add-category", aCategory, httpOptions)
  // }
  

}
