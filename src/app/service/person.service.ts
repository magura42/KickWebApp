import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import {Person} from "../model/person";

@Injectable()
export class PersonService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getPerson(personid: number): Promise<Person> {
    const url = `${environment.backendUrl}/person/${personid}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Person)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
