import {Component, Input, OnInit} from "@angular/core";
import {LoginService} from "../../service/login.service";
import {Location} from "@angular/common";
import {Event} from "../../model/event";
import {CommonComponent} from "../common.component";
import {EventService} from "../../service/event.service";
import {MatDialog} from "@angular/material";


@Component({
    selector: 'app-events-overview',
    templateUrl: './events-overview.component.html',
    styleUrls: ['./events-overview.component.css']
})
export class EventsOverviewComponent extends CommonComponent implements OnInit {

    @Input()
    teamId: number;

    events: Event[];

    constructor(private eventService: EventService, loginService: LoginService, location: Location, dialog: MatDialog) {
        super(loginService, location, dialog);

    }

    ngOnInit() {
        this.eventService.getEvents(this.teamId).then(events => {
            this.events = events;
        });
    }
}
