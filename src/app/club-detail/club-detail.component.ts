import {Component, OnInit, Input} from '@angular/core';
import { Club } from '../model/club';
import {ClubService} from "../service/club.service";
import { Location }               from '@angular/common';
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css']
})
export class ClubDetailComponent implements OnInit {

  club: Club;

  constructor(
    private clubService: ClubService,
    private loginService: LoginService,
    private location: Location
  ) { }

  getClub(): void {
    this.clubService.getClub(this.loginService.getSessionData().clubid).then(club => this.club = club);
  }

  ngOnInit() {
    this.getClub();
  }

  save(): void {
    this.clubService.update(this.club)
        .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
