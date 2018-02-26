import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
    selector: 'app-image-dialog',
    templateUrl: './image-dialog.html',
    styleUrls: ['./image-dialog.scss']
})
export class ImageDialog {

    constructor(
        public dialogRef: MatDialogRef<ImageDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}