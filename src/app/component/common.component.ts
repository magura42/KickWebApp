
import {LoginService} from "../service/login.service";
import {Location} from "@angular/common";

export class CommonComponent {

    loginService: LoginService;

    constructor(loginService: LoginService, private location: Location) {
        this.loginService = loginService;
    }

    isAdmin(): boolean {
        return this.loginService.isAdmin();
    }

    goBack():void {
        this.location.back();
    }
}