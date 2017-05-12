import {Injectable} from "@angular/core";
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import {LoginService} from "../service/login.service";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private _loginService:LoginService, private _router:Router) {
    }

    canActivate(route:ActivatedRouteSnapshot,
                state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean {
        return this._loginService.isAdmin();
    }
}