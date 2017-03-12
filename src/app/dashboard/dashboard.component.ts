import { Component, OnInit } from '@angular/core';
import {ClubService} from "../service/club.service";
import {Club} from "../model/club";
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentClub: Club;

  constructor(private clubService: ClubService, private loginService: LoginService) { }

  getCurrentClub(): void {

    this.clubService.getClub(this.loginService.getSessionData().clubid).then(club => {
      console.log("test"+ club);
      this.currentClub = club
    });
  }

  ngOnInit() {
    if (typeof this.loginService.getSessionData() !== 'undefined') {
      this.getCurrentClub();
    }
  }

}
