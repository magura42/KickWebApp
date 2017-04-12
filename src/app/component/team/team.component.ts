import {Component, OnInit} from "@angular/core";
import {TeamService} from "../../service/team.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Team} from "../../model/team";
import {LoginService} from "../../service/login.service";
import {Location} from "@angular/common";
import {Person} from "../../model/person";
import {DataTablesComponent} from "../dataTables.component";

@Component({
    selector: 'app-team',
    providers: [TeamService],
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent extends DataTablesComponent implements OnInit {

    config:Object;

    team:Team;

    coaches:Person[];

    players:Person[];

    constructor(private router:Router, location:Location, private teamService:TeamService,
                private route:ActivatedRoute, loginService:LoginService) {
        super(loginService, location);
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
        this.dtOptions.order = [[0, "asc"]];
    }

    ngOnInit() {

    }

    save():void {
        this.teamService.update(this.team);
    }


    showPersonDetails(personId) {
        console.log("personid: " + personId);
        this.router.navigate(['/persondetail', personId]);
    }
}
