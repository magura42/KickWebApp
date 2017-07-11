import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {NgPushRegistration} from "@angular/service-worker";
import {environment} from "../../environments/environment";

@Injectable()
export class PushNotificationService {

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
    }

    sendPushMsg(msg:string, title:string) {
        console.log('sendPushMsg..');
        let payload = JSON.stringify({
            notification: {
                title: title,
                body: msg
            }
        });
        console.log('payload: ' + payload);
        console.log('options ', this.options);
        //TODO use backend for sending push notification!
    }


    registerForPushNotification(registration:NgPushRegistration) {
        console.log('registerForPushNotification ', registration);
        // TODO use backend for registration!!!
        this.registration = registration;
    }


}
