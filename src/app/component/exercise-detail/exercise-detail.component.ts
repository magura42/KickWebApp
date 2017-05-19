import {Component, OnInit, OnChanges, ElementRef} from "@angular/core";
import {LoginService} from "../../service/login.service";
import {Location} from "@angular/common";
import {CommonComponent} from "../common.component";
import {Exercise} from "../../model/exercise";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ExerciseService} from "../../service/exercise.service";
import {DataService} from "../../service/data.service";
import {ActivatedRoute} from "@angular/router";
import {ExerciseType} from "../../enum/exerciseType";
import {ExerciseTypeUtil} from "../../enum/exerciseTypeUtil";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-exercise-detail',
    templateUrl: './exercise-detail.component.html',
    styleUrls: ['./exercise-detail.component.scss']
})
export class ExerciseDetailComponent extends CommonComponent implements OnInit, OnChanges {

    enumExerciseType = ExerciseType;

    exerciseTypes():Array<string> {
        var keys = Object.keys(this.enumExerciseType);
        return keys.slice(keys.length / 2);
    }

    viewMode:boolean = true;

    config:Object;

    exerciseForm:FormGroup;

    exercise:Exercise;

    graphicError:string = '';

    constructor(private element:ElementRef, private formBuilder:FormBuilder, loginService:LoginService, private exerciseService:ExerciseService, location:Location, route:ActivatedRoute,
                private dataService:DataService) {
        super(loginService, location);

        this.config = {
            toolbar: [
                ['Source', '-', 'Bold', 'Italic'],
                ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']
            ]
        };

        let exerciseId = route.snapshot.params['id'];
        this.exerciseService.getExercise(exerciseId).then(exercise => {

            this.exercise = exercise;

            this.exerciseForm = this.formBuilder.group({
                exerciseid: [''],
                name: [{value: '', disabled: this.viewMode}, [Validators.required, Validators.maxLength(100)]],
                exercisetype: [{value: '', disabled: this.viewMode}, Validators.required],
                setup: [{value: '', disabled: this.viewMode}, Validators.maxLength(500)],
                execution: [{value: '', disabled: this.viewMode}, Validators.maxLength(2000)],
                variants: [{value: '', disabled: this.viewMode}, Validators.maxLength(500)],
                note: [{value: '', disabled: this.viewMode}, Validators.maxLength(500)]
            });

            this.exerciseForm.patchValue({
                exerciseid: this.exercise.exerciseid,
                name: this.exercise.name,
                exercisetype: this.exercise.exercisetype,
                variants: this.exercise.variants,
                setup: this.exercise.setup,
                execution: this.exercise.execution,
                note: this.exercise.note
            });
        });
    }

    setViewMode(viewMode:boolean) {
        if (viewMode) {
            this.exerciseForm.controls['name'].disable();
            this.exerciseForm.controls['exercisetype'].disable();
            this.exerciseForm.controls['setup'].disable();
            this.exerciseForm.controls['execution'].disable();
            this.exerciseForm.controls['variants'].disable();
            this.exerciseForm.controls['note'].disable();
        } else {
            this.exerciseForm.controls['name'].enable();
            this.exerciseForm.controls['exercisetype'].enable();
            this.exerciseForm.controls['setup'].enable();
            this.exerciseForm.controls['execution'].enable();
            this.exerciseForm.controls['variants'].enable();
            this.exerciseForm.controls['note'].enable();
        }
        this.viewMode = viewMode;
    }

    changeListner(event) {
        if (event.target.files && event.target.files[0]) {
            var reader:FileReader = new FileReader();
            var image = this.element.nativeElement.querySelector('.exerciseDetail--foto');
            this.graphicError = "";

            if (event.target.files[0].size > environment.graphicSize) {
                this.graphicError = 'Bild zu groß (max ' + environment.graphicSizeLabel + ')';
                return false;
            }

            reader.onload = function (event:any) {
                var src = event.target.result;
                image.src = src;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    onlyView() {
        return !this.isAdmin();
    }

    getExerciseTypStr(exerciseType:string) {
        return ExerciseTypeUtil.getLabel(exerciseType);
    }

    ngOnInit() {

    }

    ngOnChanges() {

    }

    save(model:Exercise, isValid:boolean):void {
        var image = this.element.nativeElement.querySelector('.exerciseDetail--foto');
        this.exercise = this.exerciseForm.value;
        this.exercise.graphic = image.src;
        console.log("onSbumit: " + this.exerciseForm.value);
        this.exerciseService.update(this.exercise)
            .then(() => this.goBack());
    }

}
