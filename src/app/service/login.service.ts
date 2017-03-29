import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {SessionData} from "../model/sessionData";
import {environment} from "../../environments/environment";
import "rxjs/add/operator/toPromise";
import {PersonService} from "./person.service";

@Injectable()
export class LoginService {

    private headers = new Headers({'Content-Type': 'application/json'});

    private sessionData:SessionData;

    constructor(private http:Http, private personService:PersonService) {
    }

    login(username:string, password:string):Promise<SessionData> {

        let data = {"username": username, "password": password};
        this.headers.append('Access-Control-Allow-Origin', '*');
        const url = `${environment.backendUrl}login`;
        return this.http.post(url, JSON.stringify(data), {headers: this.headers})
            .toPromise()
            .then(response => {
                return response.json() as SessionData;
            })
            .catch(this.handleError);
    }

    getSessionData():SessionData {
        return this.sessionData;
    }

    setSessionData(sessiondata) {
        this.sessionData = sessiondata;
    }

    isAdmin():boolean {
        return this.sessionData.role === 'coach';
    }

    private handleError(error:any):Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
