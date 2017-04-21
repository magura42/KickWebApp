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
                private eventService:EventService, private dataService:DataService) {

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

    showButton(type, eventId, state) {

        if (this.loginService.getSessionData().role !== 'player') {
            return false;
        }

        var event:Event = this.getEvent(type, eventId);

        var personid:number = this.loginService.getSessionData().personid;

        if (state === 'yes') {
            return event.participationYes.indexOf(personid) === -1;
        } else if (state === 'maybe') {
            return event.participationMaybe.indexOf(personid) === -1;
        } else if (state === 'no') {
            return event.participationNo.indexOf(personid) === -1;
        }
        return false;
    }

    private getEvent(type, eventId):Event {

        if (type === 'training') {
            return this.trainings.filter(t => t.eventId === eventId)[0];
        } else if (type === 'game') {
            return this.games.filter(t => t.eventId === eventId)[0];
        } else if (type === 'tournament') {
            return this.tournaments.filter(t => t.eventId === eventId)[0];
        }
    }

    changeParticipationState(type, eventId, state) {

        var event:Event = this.getEvent(type, eventId);
        var personid:number = this.loginService.getSessionData().personid;

        var indexParYes = event.participationYes.indexOf(personid);
        if (indexParYes > -1) {
            event.participationYes.splice(indexParYes, 1);
        }

        var indexParMaybe = event.participationMaybe.indexOf(personid);
        if (indexParMaybe > -1) {
            event.participationMaybe.splice(indexParMaybe, 1);
        }

        var indexParNo = event.participationNo.indexOf(personid);
        if (indexParNo > -1) {
            event.participationNo.splice(indexParNo, 1);
        }

        if (state === 'yes') {
            event.participationYes.push(personid);
        } else if (state === 'maybe') {
            event.participationMaybe.push(personid);
        } else if (state === 'no') {
            event.participationNo.push(personid);
        }

        this.eventService.update(event);
    }

}
