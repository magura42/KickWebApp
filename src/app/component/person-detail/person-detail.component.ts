import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PersonService} from "../../service/person.service";
import {Person} from "../../model/person";
import {LoginService} from "../../service/login.service";
import {Location} from "@angular/common";
import {CommonComponent} from "../common.component";

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent extends CommonComponent  implements OnInit {

  person: Person;

  constructor(loginService: LoginService, route: ActivatedRoute, private personService: PersonService,
              location:Location) {
    super(loginService, location);
    let personid = route.snapshot.params['id'];
    this.personService.getPerson(personid).then(person => {
      console.log("person: " + person);
      this.person = person;
    });
  }


  ngOnInit() {

  }

  save():void {
    this.personService.update(this.person)
        .then(() => this.goBack());
  }
}
