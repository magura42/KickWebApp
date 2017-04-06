import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {LoginService} from "../../service/login.service";
import {EventService} from "../../service/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Event} from "../../model/event";
import {DataTablesComponent} from "../dataTables.component";
import {DataService} from "../../service/data.service";

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent extends DataTablesComponent implements OnInit {

    games:Event[];

    trainings:Event[];

    tournaments:Event[];


    constructor(private router:Router, loginService:LoginService, location:Location, route:ActivatedRoute,
                private eventService:EventService, private dataService: DataService) {

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

    showEventDetails(event) {
        this.dataService.currentEvent = event
        this.router.navigate(['/eventdetail']);
    }

}
