import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PersonService} from "../../service/person.service";
import {Person} from "../../model/person";

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent  {

  person: Person;

  constructor(route: ActivatedRoute, private personService: PersonService) {
    let personid = route.snapshot.params['id'];
    this.personService.getPerson(personid).then(person => {
      this.person = person;
    });
  }

}
