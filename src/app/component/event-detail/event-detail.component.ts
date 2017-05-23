import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {Location} from "@angular/common";
import {CommonComponent} from "../common.component";
import {EventService} from "../../service/event.service";
import {Event} from "../../model/event";
import {DataService} from "../../service/data.service";

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent extends CommonComponent implements OnInit {

    selectedEvent:Event;

    event:Event;

    viewMode:boolean = true;

    constructor(loginService:LoginService, route:ActivatedRoute, private eventService:EventService,
                location:Location, private dataService:DataService) {
        super(loginService, location);
    }

    setViewMode(viewMode:boolean) {
        this.viewMode = viewMode;
    }

    selectEvent() {
        this.selectedEvent = this.event;
    }

    unselectEvent() {
        this.selectedEvent = null;
    }

    ngOnInit() {
        this.event = this.dataService.currentEvent;
    }

    save():void {

        if (this.event.eventType === 'training') {
            this.eventService.updateTrainingelements(this.event.trainingelements, this.event.eventId);
        }

        this.eventService.update(this.event)
            .then(() => this.goBack());
    }

    getEventImage(eventType) {
        switch (eventType) {
            case 'match':
                return "../../assets/Spiel_500.jpg";
            case 'tournament':
                return "../../assets/Turnier_500.jpg";
            case 'teamevent':
                return "../../assets/Teamevent_500.jpg";
            default: // training
                return "../../assets/Training_500.jpg";
        }
    }
}
