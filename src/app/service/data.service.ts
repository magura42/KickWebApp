import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {Event} from "../model/event";

@Injectable()
export class DataService {

    public currentEvent: Event;

    constructor() {
    }

}
