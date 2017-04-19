import {Component, OnInit, ElementRef} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PersonService} from "../../service/person.service";
import {Person} from "../../model/person";
import {LoginService} from "../../service/login.service";
import {Location} from "@angular/common";
import {CommonComponent} from "../common.component";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-person-detail',
    templateUrl: './person-detail.component.html',
    styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent extends CommonComponent implements OnInit {

    person:Person;

    fotoError: string = '';

    constructor(private element:ElementRef, loginService:LoginService, route:ActivatedRoute,
                private personService:PersonService, location:Location) {
        super(loginService, location);
        let personid = route.snapshot.params['id'];
        this.personService.getPerson(personid).then(person => {
            console.log("person: " + person);
            this.person = person;
        });
    }

    isPersonDetailsAdmin() {
        return this.isAdmin() || this.person.personid == this.loginService.getSessionData().personid;
    }

    changeListner(event) {
        if (event.target.files && event.target.files[0]) {
            var reader:FileReader = new FileReader();
            var image = this.element.nativeElement.querySelector('.personDetail--foto');
            this.fotoError = "";

            if (event.target.files[0].size > environment.personFotoSize) {
                this.fotoError = 'Bild zu groß (max ' + environment.personFotoSizeLabel + ')';
                return false;
            }

            reader.onload = function (event:any) {
                var src = event.target.result;
                image.src = src;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    ngOnInit() {

    }

    save():void {
        var image = this.element.nativeElement.querySelector('.personDetail--foto');
        this.person.foto = image.src;
        this.personService.update(this.person)
            .then(() => this.goBack());
    }
}
