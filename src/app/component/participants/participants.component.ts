import {Component, Input} from "@angular/core";
import {Location} from "@angular/common";
import {LoginService} from "../../service/login.service";
import {EventService} from "../../service/event.service";
import {Event} from "../../model/event";
import {CommonComponent} from "../common.component";

@Component({
    selector: 'app-participants',
    templateUrl: './participants.component.html',
    styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent extends CommonComponent {

    @Input()
    event:Event;

    isVisible:boolean;

    constructor(loginService:LoginService, location:Location, private eventService:EventService) {

        super(loginService, location);
        this.isVisible = true;
    }

    showView() {
        this.isVisible = true;
    }

    hideView() {
        this.isVisible = false;
    }

    showButton(state, personid) {

        if (!this.isAdmin()) {
            return false;
        }

        return this.eventService.showButton(state, this.event, personid);
    }

    changeParticipationState(state, personid) {
        this.eventService.changeParticipationState(state, personid, this.event)
    }

    getEventName():string {
        if (this.event.eventType === 'match') {
            return 'Spiel';
        } else if (this.event.eventType === 'tournament') {
            return 'Turnier';
        } else if (this.event.eventType === 'training') {
            return 'Training';
        }
        return this.event.name;
    }
}
