import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {Location} from "@angular/common";
import {CommonComponent} from "../common.component";
import {EventService} from "../../service/event.service";
import {Event} from "../../model/event";
import {DataService} from "../../service/data.service";
import {EventType} from "../../enum/EventType";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent extends CommonComponent  implements OnInit {

  event: Event;

  constructor(loginService: LoginService, route: ActivatedRoute, private eventService: EventService,
              location:Location, private dataService: DataService) {
    super(loginService, location);
  }

  ngOnInit() {
    this.event = this.dataService.currentEvent;
  }

  save():void {
    this.eventService.update(this.event)
        .then(() => this.goBack());
  }

  getEventImage(eventType) {
    switch(+eventType) {
      case EventType.game:
        return "../../assets/spiel_500.jpg";
      case EventType.tournament:
        return "../../assets/turnier_500.jpg";
      default: // training
        return "../../assets/training_500.jpg";
    }
  }
}
