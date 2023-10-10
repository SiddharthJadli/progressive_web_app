import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"
const backendBaseUrl = 'http://localhost:8080';

const httpOptions = {
    headers: new HttpHeaders(
        {"Content-Type": "application/json"}
    )
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

    updateCategory(catId : string, updatedCategory : any) {
        return this.http.put("/update-category/" + catId, updatedCategory, httpOptions);
    }


    speech(text : string) {
        return this.http.put("/speech", text, httpOptions)
    }

    getEventCount() {
        return this.http.get("/stats1/events", httpOptions);
    }

    getCategoryCount() {
        return this.http.get("/stats1/categories", httpOptions);
    }


    getEventCountForCategory(catId : string) {
        return this.http.get(`/stats1/event-count/${catId}`, httpOptions);
    }

    displayCategory(catId : string) {
        return this.http.get("/display-category/" + catId, httpOptions)
    }

    addEvent(anEvent : any) {
        return this.http.post("/add-event", anEvent, httpOptions)
    }
    
    getEvents() {
        return this.http.get("/events")
    }

    deleteEvent(eventId : string) {
        return this.http.delete("/delete-event/" + eventId, httpOptions)
    }

    updateEvent(eventId: string, updatedEvent: any) {
        return this.http.put("/update-event/" + eventId, updatedEvent, httpOptions);
    }

    displayEvent(eventId : string) {
        return this.http.get("/display-event/" + eventId, httpOptions)
    }

    getAddCount() {
        return this.http.get("/addcount", httpOptions)
    }

    getUpdateCount() {
        return this.http.get("/updatecount", httpOptions);
    }

    getDeleteCount() {
        return this.http.get("/deletecount", httpOptions)
    }
}
