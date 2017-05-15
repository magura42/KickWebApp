import {Component, OnInit, OnChanges} from "@angular/core";
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

    exerciseForm:FormGroup;

    exercise:Exercise;

    constructor(private formBuilder:FormBuilder, loginService:LoginService, private exerciseService:ExerciseService, location:Location, route:ActivatedRoute,
                private dataService:DataService) {
        super(loginService, location);
        let exerciseId = route.snapshot.params['id'];
        this.exerciseService.getExercise(exerciseId).then(exercise => {

            this.exercise = exercise;

            this.exerciseForm = this.formBuilder.group({
                name: [{value: '', disabled: this.onlyView()}, Validators.required],
                exerciseType: [{value: '', disabled: this.onlyView()}, Validators.required],
                setup: [{value: '', disabled: this.onlyView()}],
                execution: [{value: '', disabled: this.onlyView()}],
                variants: [{value: '', disabled: this.onlyView()}],
                note: [{value: '', disabled: this.onlyView()}]
            });

            this.exerciseForm.patchValue({
                name: this.exercise.name,
                exerciseType: this.exercise.exercisetype,
                variants: this.exercise.variants,
                setup: this.exercise.setup,
                execution: this.exercise.execution,
                note: this.exercise.note
            });
        });
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
        console.log("onSbumit: " + this.exerciseForm.value);
        // this.exerciseService.update(this.exercise)
        //     .then(() => this.goBack());
    }

}
