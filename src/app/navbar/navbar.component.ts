import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    private logo:string = "../../assets/ball.png";


    constructor() {
    }

    ngOnInit() {
    }

}
