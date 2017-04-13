import {Component, OnInit, Input} from "@angular/core";
import {CommonComponent} from "../common.component";
import {LoginService} from "../../service/login.service";
import {Location} from "@angular/common";
import {Event} from "../../model/event";
import {EventService} from "../../service/event.service";
import {DataService} from "../../service/data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent extends CommonComponent implements OnInit {

    @Input()
    eventId:number;

    @Input()
    eventType:string;

    event:Event;

    personid:number;

    constructor(private router:Router, loginService:LoginService, location:Location,
                private eventService:EventService, private dataService:DataService) {
        super(loginService, location);
        this.personid = this.loginService.getSessionData().personid;
    }

    ngOnInit() {
        this.eventService.getEvent(this.eventId, this.eventType).then(event => {
            this.event = event;
        });
    }

    changeParticipationState(state) {
        console.log("new state " + state + " for personId " + this.personid);
        //
    }

    showButton(state) {
        if (this.loginService.getSessionData().role !== 'player') {
            return false;
        }
        if (state === 'yes') {
            return this.event.participationYes.indexOf(this.personid) > -1;
        } else if (state === 'maybe') {
            return this.event.participationMaybe.indexOf(this.personid) > -1;
        } else if (state === 'no') {
            return this.event.participationNo.indexOf(this.personid) > -1;
        }
        return false;
    }

    showEventDetails() {
        this.dataService.currentEvent = this.event
        this.router.navigate(['/eventdetail']);
    }
}
