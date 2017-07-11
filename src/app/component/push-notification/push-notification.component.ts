import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {LoginService} from "../../service/login.service";
import {CommonComponent} from "../common.component";
import {PushNotificationService} from "../../service/pushNotification.service";
import {NgPushRegistration} from "@angular/service-worker";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";

@Component({
    selector: 'app-push-notification',
    templateUrl: './push-notification.component.html',
    styleUrls: ['./push-notification.component.scss']
})
export class PushNotificationComponent extends CommonComponent implements OnInit {


    pushNotificationForm:FormGroup;

    constructor(formBuilder:FormBuilder, private pushNotificationService:PushNotificationService, loginService:LoginService, location:Location) {
        super(loginService, location);

        this.pushNotificationForm = formBuilder.group({
            pushTitle: ['', [Validators.required, Validators.maxLength(20)]],
            pushMsg: ['', [Validators.required, Validators.maxLength(100)]]
        });
    }

    ngOnInit() {
    }

    send(msg:string, title:string):void {
        this.pushNotificationService.sendPushMsg(msg, title);
    }

}
