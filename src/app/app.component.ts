import {Component, OnInit, AfterViewInit} from "@angular/core";
import {LoginService} from "./service/login.service";
import {environment} from "../environments/environment";
import {SessionData} from "./model/sessionData";
import {Router} from "@angular/router";
import {CommonComponent} from "./component/common.component";
import {Location} from "@angular/common";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends CommonComponent implements OnInit, AfterViewInit {

    title = 'KickWebApp v0.1';

    sessionData:SessionData;

    constructor(loginService:LoginService, location:Location, private router:Router) {
        super(loginService, location);
    }

    initSessionData():void {
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
