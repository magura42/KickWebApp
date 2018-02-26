import {AfterViewInit, Component, OnInit} from "@angular/core";
import {LoginService} from "./service/login.service";
import {environment} from "../environments/environment";
import {SessionData} from "./model/sessionData";
import {Router} from "@angular/router";
import {CommonComponent} from "./component/common.component";
import {Location} from "@angular/common";
import {NgServiceWorker} from "@angular/service-worker";
import {PushNotificationService} from "./service/pushNotification.service";
import {MatDialog} from "@angular/material";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends CommonComponent implements OnInit, AfterViewInit {

    title = 'KickWebApp v0.1';

    sessionData: SessionData;

    constructor(private pushNotificationService: PushNotificationService, private sw: NgServiceWorker,
                loginService: LoginService, location: Location, private router: Router, dialog: MatDialog) {
        super(loginService, location, dialog);

        this.initServiceWorker();
    }

    initServiceWorker() {

        console.log('init service worker...');

        this.sw.registerForPush({
            applicationServerKey: `${environment.pushNotifications.publicKey}`
        })
            .subscribe(registration => {
                    console.log('successfully registered!');
                    this.pushNotificationService.registerForPushNotification(registration);

                },
                err => {
                    console.log('error registering for push', err);
                });

        this.sw.push.subscribe(push => {
            console.log('received push message', push);
        });
    }

    initSessionData(): void {
        this.loginService.login(environment.username, environment.password).then(sessionData => {
            this.loginService.setSessionData(sessionData);
            this.sessionData = sessionData;
            this.router.navigate(['/dashboard', sessionData.clubid]);
        });
    }

    ngOnInit() {
        this.initSessionData();
    }

    ngAfterViewInit() {
        $('body').on('click', '.nav-link', function () {
            $('.navbar').addClass('collapsed');
            $('.navbar-collapse').removeClass('show');
        });
    }
}
