import { Injectable }     from '@angular/core';
import {CanActivate, Router}    from '@angular/router';
import {LoginService} from "../service/login.service";

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private _loginService: LoginService, private _router: Router) { }

    canActivate() {

        if (typeof this._loginService.getSessionData() === 'undefined' || !this._loginService.isAdmin) {
            this._router.navigate(['/']);
        }

        return this._loginService.isAdmin;
    }
}