import {Component, OnInit, Input} from '@angular/core';
import { Club } from '../model/club';
import {ClubService} from "../service/club.service";

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css']
})
export class ClubDetailComponent implements OnInit {

  club: Club;

  constructor(private clubService: ClubService) { }

  getClub(): void {
    this.clubService.getClub(1).then(club => this.club = club);
  }

  ngOnInit() {
    this.getClub();
  }

}
