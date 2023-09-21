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
    result : any;

    getCategory() {
        return this.http.get(`${backendBaseUrl}/list-category`)
    }

    addCategory(aCategory : any) {
        return this.http.post(`${backendBaseUrl}/add-category`, aCategory, httpOptions)
    }

    deleteCategory(catId : string) {
        return this.http.delete("/delete-category" + catId)
    }

    updateCategory(catId : string, aCategory : any) {
        return this.http.put("/update-category", aCategory, httpOptions)
    }


}
