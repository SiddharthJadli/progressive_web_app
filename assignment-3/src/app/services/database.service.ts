import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"
const backendBaseUrl = 'http://localhost:8080';

const httpOptions = {
    headers: new HttpHeaders(
        {"Content-Type": "application/json"})
};

@Injectable({providedIn: 'root'})
export class DatabaseService {

    constructor(private http : HttpClient) {}
    // result : any;


    addCategory(aCategory : any) {
        return this.http.post("/add-category", aCategory, httpOptions)
    }
    
    getCategory() {
        return this.http.get("/list-category")
    }

    deleteCategory(catId : string) {
        return this.http.delete("/delete-category/" + catId, httpOptions)
    }

    updateCategory(catId: string, updatedCategory: any) {
        return this.http.put("/update-category/" + catId, updatedCategory, httpOptions);
      }
      

    speech(text: string) {
        return this.http.put("/speech", text, httpOptions)
    }

    getEventCount() {
        return this.http.get("/stats1");
    }

    getCategoryCount() {
        return this.http.get("/stats1");
    }

    displayCategory(catId : string) {
        return this.http.get("/display-category/" + catId, httpOptions)

    }

    


}
