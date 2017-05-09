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

    selectedEvent:Event;

    matches:Event[];

    trainings:Event[];

    tournaments:Event[];

    teamevents:Event[];

    constructor(private router:Router, loginService:LoginService, location:Location, route:ActivatedRoute,
                private eventService:EventService, private dataService:DataService) {

        super(loginService, location);

        let teamid = route.snapshot.params['teamId'];
        this.eventService.getMatches(teamid).then(matches => {
            this.matches = matches;
        });
        this.eventService.getTournaments(teamid).then(tournaments => {
            this.tournaments = tournaments;
        });
        this.eventService.getTrainings(teamid).then(trainings => {
            this.trainings = trainings;
        });
        this.eventService.getTeamevents(teamid).then(teamevents => {
            this.teamevents = teamevents;
        });
    }

    ngOnInit() {

    }

    showParticipantsViewButton(status, event) {
        if (event === this.selectedEvent) {
            if (status === 'show') {
                return false;
            } else {
                return true;
            }
        } else {
            if (status === 'show') {
                return true;
            } else {
                return false;
            }
        }
    }

    showEventDetails(event) {
        this.dataService.currentEvent = event
        this.router.navigate(['/eventdetail']);
    }

    showParticipants4Event(event:Event) {
        this.selectedEvent = event;
    }

    hideParticipants4Event() {
        this.selectedEvent = null;
    }

    showButton(type, eventId, state) {

        if (this.loginService.getSessionData().role !== 'player') {
            return false;
        }

        var event:Event = this.getEvent(type, eventId);

        var personid:number = this.loginService.getSessionData().personid;

        return this.eventService.showButton(state, event, personid);
    }

    private getEvent(type, eventId):Event {

        if (type === 'training') {
            return this.trainings.filter(t => t.eventId === eventId)[0];
        } else if (type === 'match') {
            return this.matches.filter(t => t.eventId === eventId)[0];
        } else if (type === 'tournament') {
            return this.tournaments.filter(t => t.eventId === eventId)[0];
        } else if (type === 'teamevent') {
            return this.teamevents.filter(t => t.eventId === eventId)[0];
        }
    }

    changeParticipationState(type, eventId, state) {

        var event:Event = this.getEvent(type, eventId);
        var personid:number = this.loginService.getSessionData().personid;

        this.eventService.changeParticipationState(state, personid, event);
    }

}
