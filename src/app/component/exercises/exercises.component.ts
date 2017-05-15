import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {LoginService} from "../../service/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Exercise} from "../../model/exercise";
import {DataTablesComponent} from "../dataTables.component";
import {ExerciseService} from "../../service/exercise.service";
import {ExerciseTypeUtil} from "../../enum/exerciseTypeUtil";

@Component({
    selector: 'app-exercises',
    templateUrl: './exercises.component.html',
    styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent extends DataTablesComponent {

    exercises:Exercise[];

    constructor(private router:Router, loginService:LoginService, location:Location, route:ActivatedRoute,
                private exerciseService:ExerciseService) {

        super(loginService, location);

        this.exerciseService.getExercises().then(exercises => {
            this.exercises = exercises;
        });
    }

    getExerciseTypStr(exerciseType:string) {
        return ExerciseTypeUtil.getLabel(exerciseType);
    }

    showExerciseDetails(exerciseId) {
        this.router.navigate(['/exercisedetail', exerciseId]);
    }
}
