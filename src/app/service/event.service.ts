import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {Event} from "../model/event";
import {environment} from "../../environments/environment";
import "rxjs/add/operator/toPromise";

@Injectable()
export class EventService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http:Http) {
    }

    getEvent(eventid:number, eventType:string):Promise<Event> {
        this.headers.append('Access-Control-Allow-Origin', '*');
        const url = `${environment.backendUrl}${eventType}/${eventid}/event`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(response =>
                response.json() as Event)
            .catch(this.handleError);
    }

    update(event:Event):Promise<Event> {
        const url = `${environment.backendUrl}event/${event.eventId}`;
        return this.http
            .put(url, JSON.stringify(event), {headers: this.headers})
            .toPromise()
            .then(() => event)
            .catch(this.handleError);
    }

    getTrainings(teamid:number):Promise<Event[]> {
        this.headers.append('Access-Control-Allow-Origin', '*');
        const url = `${environment.backendUrl}team/${teamid}/trainings`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(response =>
                response.json() as Event[])
            .catch(this.handleError);
    }

    getEvents(teamid:number):Promise<Event[]> {
        this.headers.append('Access-Control-Allow-Origin', '*');
        const url = `${environment.backendUrl}team/${teamid}/events`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(response =>
                response.json() as Event[])
            .catch(this.handleError);
    }

    getTournaments(teamid:number):Promise<Event[]> {
        this.headers.append('Access-Control-Allow-Origin', '*');
        const url = `${environment.backendUrl}team/${teamid}/tournaments`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(response =>
                response.json() as Event[])
            .catch(this.handleError);
    }

    getTeamevents(teamid:number):Promise<Event[]> {
        this.headers.append('Access-Control-Allow-Origin', '*');
        const url = `${environment.backendUrl}team/${teamid}/teamevents`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(response =>
                response.json() as Event[])
            .catch(this.handleError);
    }

    getGames(teamid:number):Promise<Event[]> {
        this.headers.append('Access-Control-Allow-Origin', '*');
        const url = `${environment.backendUrl}team/${teamid}/games`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(response =>
                response.json() as Event[])
            .catch(this.handleError);
    }

    private handleError(error:any):Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
