import {Component, OnInit} from "@angular/core";
import {TeamService} from "../../service/team.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Team} from "../../model/team";
import {LoginService} from "../../service/login.service";
import {Location} from "@angular/common";
import {Person} from "../../model/person";

@Component({
    selector: 'app-team',
    providers: [TeamService],
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

    config:Object;

    team:Team;

    coaches: Person[];

    players: Person[];

    constructor(private router: Router, private location:Location, private teamService: TeamService,
                private route: ActivatedRoute, private loginService: LoginService) {
        this.config = {
            toolbar: [
                ['Source', '-', 'Bold', 'Italic'],
                ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']
            ]
        };
        let id = +this.route.snapshot.params['id'];
        this.teamService.getTeam(id).then(team => {
            this.team = team;
        });
        this.teamService.getCoaches(id).then(coaches => {
            this.coaches = coaches;
        });
        this.teamService.getPlayers(id).then(players => {
            this.players = players;
        });
    }

    isAdmin(): boolean {
        return this.loginService.isAdmin();
    }

    ngOnInit() {

    }

    save():void {
        this.teamService.update(this.team);
    }

    goBack():void {
        this.location.back();
    }

    showPersonDetails(personId) {
        console.log("personid: " + personId);
        this.router.navigate(['/persondetail', personId]);
    }
}
