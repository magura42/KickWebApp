import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Club } from '../model/club';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClubService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getClub(clubid: number): Promise<Club> {
    this.headers.append('Access-Control-Allow-Origin', '*');
    const url = `${environment.backendUrl}club/${clubid}`;
    return this.http.get(url, {headers: this.headers})
        .toPromise()
        .then(response =>
            response.json() as Club)
        .catch(this.handleError);
  }

  delete(clubid: number): Promise<void> {
    const url = `${environment.backendUrl}club/${clubid}`;
    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(name: string): Promise<Club> {
    return this.http
        .post(environment.backendUrl+'club', JSON.stringify({name: name}), {headers: this.headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
  }

  update(club: Club): Promise<Club> {
    const url = `${environment.backendUrl}club/${club.clubid}`;
    return this.http
        .put(url, JSON.stringify(club), {headers: this.headers})
        .toPromise()
        .then(() => club)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
