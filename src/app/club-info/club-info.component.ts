import {Component, OnInit, Input} from '@angular/core';
import { Club } from '../model/club';
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.css']
})
export class ClubInfoComponent implements OnInit {

  @Input()
  club: Club;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

}
