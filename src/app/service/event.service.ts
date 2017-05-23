import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {Event} from "../model/event";
import {environment} from "../../environments/environment";
import "rxjs/add/operator/toPromise";
import {Participant} from "../model/participant";
import {TrainingElement} from "../model/trainingelement";

@Injectable()
export class EventService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http:Http) {
    }

    showButton(state:string, event:Event, personid:number) {
        if (state === 'yes') {
            return event.participationYes.findIndex(p => p.participantId === personid) === -1;
        } else if (state === 'maybe') {
            return event.participationMaybe.findIndex(p => p.participantId === personid) === -1;
        } else if (state === 'no') {
            return event.participationNo.findIndex(p => p.participantId === personid) === -1;
        }
        return false;
    }

    changeParticipationState(state:string, personid:number, event:Event) {

        var name:string;

        // remove old participation status:
        var indexParYes = event.participationYes.findIndex(p => p.participantId === personid);
        if (indexParYes > -1) {
            name = event.participationYes[indexParYes].name;
            event.participationYes.splice(indexParYes, 1);
        }

        var indexParMaybe = event.participationMaybe.findIndex(p => p.participantId === personid);
        if (indexParMaybe > -1) {
            name = event.participationMaybe[indexParMaybe].name;
            event.participationMaybe.splice(indexParMaybe, 1);
        }

        var indexParNo = event.participationNo.findIndex(p => p.participantId === personid);
        if (indexParNo > -1) {
            name = event.participationNo[indexParNo].name;
            event.participationNo.splice(indexParNo, 1);
        }

        // add new participation status:
        var participant:Participant = new Participant(personid, name);
        if (state === 'yes') {
            event.participationYes.push(participant);
        } else if (state === 'maybe') {
            event.participationMaybe.push(participant);
        } else if (state === 'no') {
            event.participationNo.push(participant);
        }

        this.update(event);

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

    updateTrainingelements(trainingelements:TrainingElement[], trainingid:number) {

        const url = '${environment.backendUrl}trainingelement';

        this.http.delete(url + '?trainingid=' + trainingid, {headers: this.headers}).toPromise()
            .then(function (response) {
                for (let trainingelement of trainingelements) {
                    this.http.post(url, JSON.stringify(trainingelement), {headers: this.headers});
                }
            })
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

    getMatches(teamid:number):Promise<Event[]> {
        this.headers.append('Access-Control-Allow-Origin', '*');
        const url = `${environment.backendUrl}team/${teamid}/matches`;
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
