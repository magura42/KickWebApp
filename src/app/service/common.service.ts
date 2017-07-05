import {Headers} from "@angular/http";

export class CommonService {

    protected headers:Headers;

    constructor() {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        // this.headers.append('Access-Control-Allow-Origin', '*');
        // this.headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    }

    protected handleError(error:any):Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}