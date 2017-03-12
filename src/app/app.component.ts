import {Component, OnInit} from '@angular/core';
import {LoginService} from "./service/login.service";
import {environment} from '../environments/environment';
import {SessionData} from './model/sessionData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  title = 'KickWebApp v0.1';

  constructor(private loginService: LoginService) { }

  initSessionData(): void {
    this.loginService.login(environment.username, environment.password).then(sessionData => {
      console.log("session data: "+ sessionData.personname);
      this.loginService.setSessionData(sessionData);
    });
  }

  ngOnInit() {
    this.initSessionData();
  }
}
