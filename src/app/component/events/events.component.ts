import {Component, OnInit} from "@angular/core";
import {CommonComponent} from "../common.component";
import {Location} from "@angular/common";
import {LoginService} from "../../service/login.service";
import {EventService} from "../../service/event.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent extends CommonComponent implements OnInit {

    games:Event[];

    trainings:Event[];

    tournaments:Event[];

    constructor(loginService:LoginService, location:Location, route:ActivatedRoute,
                private eventService:EventService) {

        super(loginService, location);

        let teamid = route.snapshot.params['teamId'];
        // this.eventService.getGames(teamid).then(games => {
        //     this.games = games;
        // });
        this.eventService.getTournaments(teamid).then(tournaments => {
            this.tournaments = tournaments;
        });
        this.eventService.getTrainings(teamid).then(trainings => {
            this.trainings = trainings;
        });
    }

    ngOnInit() {

    }

}
