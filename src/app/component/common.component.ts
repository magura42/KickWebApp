import {LoginService} from "../service/login.service";
import {Location} from "@angular/common";
import {ImageDialog} from "./image-dialog/image-dialog";
import {MatDialog} from "@angular/material";

export class CommonComponent {

    loginService: LoginService;

    constructor(loginService: LoginService, private location: Location, private dialog: MatDialog,) {
        this.loginService = loginService;
    }

    isAdmin(): boolean {
        return this.loginService.isAdmin();
    }

    goBack(): void {
        this.location.back();
    }


    openDialog(name, src): void {
        this.dialog.open(ImageDialog, {
            data: {src: src, caption: name}
        });
    }
}