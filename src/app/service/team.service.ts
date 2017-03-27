import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import {Team} from "../model/team";
import {Person} from "../model/person";

@Injectable()
export class TeamService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getTeam(teamid: number): Promise<Team> {
    this.headers.append('Access-Control-Allow-Origin', '*');
    const url = `${environment.backendUrl}team/${teamid}`;
    return this.http.get(url, {headers: this.headers})
        .toPromise()
        .then(response =>
            response.json() as Team)
        .catch(this.handleError);
  }

  getCoaches(teamid: number): Promise<Person[]> {
    this.headers.append('Access-Control-Allow-Origin', '*');
    const url = `${environment.backendUrl}team/${teamid}/coaches`;
    return this.http.get(url, {headers: this.headers})
        .toPromise()
        .then(response =>
            response.json() as Person[])
        .catch(this.handleError);
  }

  getPlayers(teamid: number): Promise<Person[]> {
    this.headers.append('Access-Control-Allow-Origin', '*');
    const url = `${environment.backendUrl}team/${teamid}/players`;
    return this.http.get(url, {headers: this.headers})
        .toPromise()
        .then(response =>
            response.json() as Person[])
        .catch(this.handleError);
  }

  delete(teamid: number): Promise<void> {
    const url = `${environment.backendUrl}team/${teamid}`;
    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(name: string): Promise<Team> {
    return this.http
        .post(environment.backendUrl+'team', JSON.stringify({name: name}), {headers: this.headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
  }

  update(team: Team): Promise<Team> {
    const url = `${environment.backendUrl}team/${team.teamid}`;
    return this.http
        .put(url, JSON.stringify(team), {headers: this.headers})
        .toPromise()
        .then(() => team)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
