import {ExerciseType} from "../enum/exerciseType";
import {TeamType} from "../enum/teamType";

export class Exercise {

    exerciseid:number;
    name:string;
    exercisetype:ExerciseType;
    teamtype:TeamType;
    setup:string;
    execution:string;
    variants:string;
    graphic:string;
    note:string = '';
}
