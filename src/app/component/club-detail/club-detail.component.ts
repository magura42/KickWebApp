import {Component, ElementRef, OnInit} from "@angular/core";
import {Club} from "../../model/club";
import {ClubService} from "../../service/club.service";
import {Location} from "@angular/common";
import {LoginService} from "../../service/login.service";
import {ActivatedRoute} from "@angular/router";
import {CommonComponent} from "../common.component";
import {environment} from "../../../environments/environment";
import {MatDialog} from "@angular/material";

@Component({
    selector: 'app-club-detail',
    templateUrl: './club-detail.component.html',
    styleUrls: ['./club-detail.component.scss']
})
export class ClubDetailComponent extends CommonComponent implements OnInit {

    club: Club;

    logoError: string = '';

    constructor(private element: ElementRef, loginService: LoginService, private clubService: ClubService, location: Location,
                private route: ActivatedRoute, dialog: MatDialog) {
        super(loginService, location, dialog);
        let id = +this.route.snapshot.params['id'];
        this.clubService.getClub(id).then(club => {
            this.club = club;
        });
    }

    changeListner(event) {
        if (event.target.files && event.target.files[0]) {
            var reader: FileReader = new FileReader();
            var image = this.element.nativeElement.querySelector('.clubDetail--logo');
            this.logoError = "";

            if (event.target.files[0].size > environment.personFotoSize) {
                this.logoError = 'Bild zu groß (max ' + environment.personFotoSizeLabel + ')';
                return false;
            }

            reader.onload = function (event: any) {
                var src = event.target.result;
                image.src = src;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    ngOnInit() {
    }

    save(): void {
        var image = this.element.nativeElement.querySelector('.clubDetail--logo');
        this.club.logo = image.src;
        this.clubService.update(this.club)
            .then(() => this.goBack());
    }
}
