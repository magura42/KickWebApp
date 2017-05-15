import {ExerciseType} from "../enum/exerciseType";

export class Exercise {

    exerciseid:number;
    name:string;
    exercisetype:ExerciseType;
    setup:string;
    execution:string;
    variants:string;
    graphic:string;
    note:string = '';
}
