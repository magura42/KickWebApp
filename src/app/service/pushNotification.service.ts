import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {NgPushRegistration} from "@angular/service-worker";
import {environment} from "../../environments/environment";
import {PushRegistration} from "../model/pushRegistration";
import {CommonService} from "./common.service";
import {PushNotification} from "../model/pushNotification";

@Injectable()
export class PushNotificationService extends CommonService {

    registration:NgPushRegistration;

    options = {
        vapidDetails: {
            subject: 'http://127.0.0.1:8080',
            publicKey: `${environment.pushNotifications.publicKey}`,
            privateKey: `${environment.pushNotifications.privateKey}`
        },
        TTL: 5000
    }


    constructor(private http:Http) {
        super();
    }

    sendPushMsg(msg:string, title:string) {
        console.log('sendPushMsg..');
        // let payload = JSON.stringify({
        //     notification: {
        //         title: title,
        //         body: msg
        //     }
        // });
        // console.log('payload: ' + payload);
        // console.log('options ', this.options);

        let pushNotification = new PushNotification(title, msg);
        const url = `${environment.backendUrl}pushnotification`;
        return this.http
            .post(url, JSON.stringify(pushNotification), {headers: this.headers})
            .toPromise()
            .catch(this.handleError);
    }


    registerForPushNotification(registration:NgPushRegistration) {
        console.log('registerForPushNotification ', registration);

        let pushRegistration:PushRegistration = new PushRegistration(registration.url, registration.auth(), registration.key());

        console.log(JSON.stringify(registration));

        const url = `${environment.backendUrl}pushregistration`;
        return this.http
            .post(url, JSON.stringify(pushRegistration), {headers: this.headers})
            .toPromise()
            .catch(this.handleError);
    }


}
