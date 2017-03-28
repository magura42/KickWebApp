import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PersonService} from "../../service/person.service";
import {Person} from "../../model/person";
import {LoginService} from "../../service/login.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent  implements OnInit {

  person: Person;

  constructor(private loginService: LoginService, route: ActivatedRoute, private personService: PersonService,
              private location:Location) {
    let personid = route.snapshot.params['id'];
    this.personService.getPerson(personid).then(person => {
      console.log("person: " + person);
      this.person = person;
    });
  }

  isAdmin(): boolean {
    return this.loginService.isAdmin();
  }

  ngOnInit() {

  }

  save():void {
    this.personService.update(this.person)
        .then(() => this.goBack());
  }

  goBack():void {
    this.location.back();
  }
}
