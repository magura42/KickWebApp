import {Component, OnInit, Input} from "@angular/core";
import {LoginService} from "../service/login.service";
import {SessionData} from "../model/sessionData";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    private logo:string = "../../assets/ball.png";

    @Input()
    sessionData: SessionData;

    constructor() {
    }

    ngOnInit() {
    }

}
