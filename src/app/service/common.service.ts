import {Headers, Http} from "@angular/http";

export class CommonService {
    headers = new Headers({'Content-Type': 'application/json'});
    
    constructor() {
        this.headers.append('Access-Control-Allow-Origin', '*');    
    }

    handleError(error:any):Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}