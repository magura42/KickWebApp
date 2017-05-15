import {Component, OnInit} from "@angular/core";
import {ClubService} from "../../service/club.service";
import {LoginService} from "../../service/login.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    teamId:number;

    constructor(private clubService:ClubService, private loginService:LoginService,
                private route:ActivatedRoute) {
        this.teamId = +this.route.snapshot.params['teamId'];

    }

    ngOnInit() {
    }

}
