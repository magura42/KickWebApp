import {Component, OnInit} from '@angular/core';
import {LoginService} from "./service/login.service";
import {environment} from '../environments/environment';
import {SessionData} from './model/sessionData';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'KickWebApp v0.1';

  sessionData: SessionData;

  constructor(private loginService: LoginService, private router: Router) {
    console.log("constructor AppComponent");
  }

  initSessionData(): void {
    this.loginService.login(environment.username, environment.password).then(sessionData => {
      console.log("session data: "+ sessionData.personname);
      this.loginService.setSessionData(sessionData);
      this.sessionData = sessionData;
      this.router.navigate(['/dashboard', sessionData.clubid]);
    });
  }

  ngOnInit() {
    console.log("ngOnInit AppComponent");
    this.initSessionData();
  }
}
