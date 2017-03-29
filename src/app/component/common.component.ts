
import {LoginService} from "../service/login.service";
import {Location} from "@angular/common";

export class CommonComponent {

    constructor(private loginService: LoginService, private location: Location) {
    }

    isAdmin(): boolean {
        return this.loginService.isAdmin();
    }

    goBack():void {
        this.location.back();
    }
}