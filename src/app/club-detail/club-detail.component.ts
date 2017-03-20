import {Component, OnInit} from "@angular/core";
import {Club} from "../model/club";
import {ClubService} from "../service/club.service";
import {Location} from "@angular/common";
import {LoginService} from "../service/login.service";
import {CommonComponent} from "../component/common/CommonComponent";

@Component({
    selector: 'app-club-detail',
    templateUrl: './club-detail.component.html',
    styleUrls: ['./club-detail.component.scss']
})
export class ClubDetailComponent implements OnInit {

    club:Club;

    constructor(private loginService:LoginService, private clubService:ClubService, private location:Location) {
        this.getClub();
    }

    getClub():void {
        this.clubService.getClub(this.loginService.getSessionData().clubid).then(club => {
            this.club = club;
            console.log("club: " + this.club.name);
        });
    }

    isAdmin(): boolean {
        return this.loginService.isAdmin();
    }

    ngOnInit() {

    }

    save():void {
        this.clubService.update(this.club)
            .then(() => this.goBack());
    }

    goBack():void {
        this.location.back();
    }

}
