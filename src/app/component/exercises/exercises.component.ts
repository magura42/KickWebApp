import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {LoginService} from "../../service/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Exercise} from "../../model/exercise";
import {DataTablesComponent} from "../dataTables.component";
import {DataService} from "../../service/data.service";
import {ExerciseService} from "../../service/exercise.service";
import {ExerciseType} from "../../enum/exerciseType";

@Component({
    selector: 'app-exercises',
    templateUrl: './exercises.component.html',
    styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent extends DataTablesComponent implements OnInit {

    enumExerciseType = ExerciseType;

    exercises:Exercise[];

    constructor(private router:Router, loginService:LoginService, location:Location, route:ActivatedRoute,
                private exerciseService:ExerciseService, private dataService:DataService) {

        super(loginService, location);

        this.exerciseService.getExercises().then(exercises => {
            this.exercises = exercises;
        });
    }

    ngOnInit() {

    }


}
