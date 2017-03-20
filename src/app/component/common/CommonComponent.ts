import {LoginService} from "../../service/login.service";
import {Injectable} from "@angular/core";

@Injectable
export class CommonComponent {

    constructor(private _loginService: LoginService) {

    }

    isAdmin(): boolean {
        return this._loginService.isAdmin();
    }
}