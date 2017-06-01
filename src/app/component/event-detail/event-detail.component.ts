import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {Location} from "@angular/common";
import {CommonComponent} from "../common.component";
import {EventService} from "../../service/event.service";
import {Event} from "../../model/event";
import {DataService} from "../../service/data.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent extends CommonComponent implements OnInit {

    selectedEvent:Event;

    event:Event;

    viewMode:boolean = true;

    eventForm:FormGroup;

    constructor(loginService:LoginService, route:ActivatedRoute, private eventService:EventService,
                location:Location, private dataService:DataService, private formBuilder:FormBuilder) {
        super(loginService, location);
    }

    selectEvent() {
        this.selectedEvent = this.event;
    }

    unselectEvent() {
        this.selectedEvent = null;
    }

    ngOnInit() {
        this.event = this.dataService.currentEvent;

        this.eventForm = this.formBuilder.group({
            date: [{value: this.event.date, disabled: this.viewMode}, Validators.required],
            endtime: [{value: this.event.endtime, disabled: this.viewMode}, Validators.required],
            begintime: [{value: this.event.begintime, disabled: this.viewMode}, Validators.required],
            gettogethertime: [{value: this.event.gettogethertime, disabled: this.viewMode}, Validators.required],
            street: [{value: this.event.street, disabled: this.viewMode}, Validators.required],
            zipcode: [{value: this.event.zipcode, disabled: this.viewMode}, Validators.required],
            city: [{value: this.event.city, disabled: this.viewMode}, Validators.required]
        });


    }

    setViewMode(viewMode:boolean) {
        if (viewMode) {
            Object.values(this.eventForm.controls).forEach(function (control) {
                control.disable();
            });
        } else {
            Object.values(this.eventForm.controls).forEach(function (control) {
                control.enable();
            });
        }
        this.viewMode = viewMode;
    }

    save(model:Event, isValid:boolean):void {

        this.event = model;

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
