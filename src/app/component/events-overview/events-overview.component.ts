import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-events-overview',
  templateUrl: './events-overview.component.html',
  styleUrls: ['./events-overview.component.css']
})
export class EventsOverviewComponent implements OnInit {

  @Input()
  clubId: number;

  constructor() {
    console.log("constructor EventsOverviewComponent...");
  }

  ngOnInit() {
  }

}
