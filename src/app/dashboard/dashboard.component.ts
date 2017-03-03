import { Component, OnInit } from '@angular/core';
import {ClubService} from "../service/club.service";
import {Club} from "../model/club";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentClub: Club;

  constructor(private clubService: ClubService) { }

  getCurrentClub(): void {
    this.clubService.getClub(1).then(club => {
      console.log("test"+ club);
      this.currentClub = club
    });
  }

  ngOnInit() {
    this.getCurrentClub();
  }

}
