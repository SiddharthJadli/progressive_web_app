import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"

const httpOptions = {
    headers: new HttpHeaders(
        {"Content-Type": "application/json"})
};

@Injectable({providedIn: 'root'})
export class DatabaseService {

    constructor(private http : HttpClient) {}
    result : any;

    getCategory() {
        return this.http.get('/add-category')
    }

    addCategory(aCategory : any) {
        return this.http.post("/add-category", aCategory, httpOptions)
    }

    deleteCategory(catId : string) {
        return this.http.delete("/delete-category" + catId)
    }

    updateCategory(catId : string, aCategory : any) {
        return this.http.put("/update-category", aCategory, httpOptions)
    }


}
