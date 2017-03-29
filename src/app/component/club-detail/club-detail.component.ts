import {Component, OnInit} from "@angular/core";
import {Club} from "../../model/club";
import {ClubService} from "../../service/club.service";
import {Location} from "@angular/common";
import {LoginService} from "../../service/login.service";
import {ActivatedRoute} from "@angular/router";
import {CommonComponent} from "../common.component";

@Component({
    selector: 'app-club-detail',
    templateUrl: './club-detail.component.html',
    styleUrls: ['./club-detail.component.scss']
})
export class ClubDetailComponent extends CommonComponent implements OnInit {

    club:Club;

    constructor(loginService:LoginService, private clubService:ClubService, location:Location,
                private route:ActivatedRoute) {
        super(loginService, location);
        let id = +this.route.snapshot.params['id'];
        this.clubService.getClub(id).then(club => {
            this.club = club;
        });
    }

    ngOnInit() {
    }

    save():void {
        this.clubService.update(this.club)
            .then(() => this.goBack());
    }
}
