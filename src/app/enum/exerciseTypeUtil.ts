import {ExerciseType} from "./exerciseType";

export class ExerciseTypeUtil {

    public static getLabel(exerciseType:string) {
        switch (exerciseType) {
            case ExerciseType[ExerciseType.warmup]:
                return "Aufwärmen"
            case ExerciseType[ExerciseType.shot]:
                return "Torschuss";
            case ExerciseType[ExerciseType.pass]:
                return "Passen";
            case ExerciseType[ExerciseType.trick]:
                return "Trick";
            case ExerciseType[ExerciseType.duel]:
                return "Eins gegen eins";
            case ExerciseType[ExerciseType.goalkeeper]:
                return "Torwart";
            case ExerciseType[ExerciseType.header]:
                return "Kopfball";
            case ExerciseType[ExerciseType.indoor]:
                return "Halle";
            case ExerciseType[ExerciseType.freeplay]:
                return "Freies Spiel";
            case ExerciseType[ExerciseType.feeling]:
                return "Technik";
            default:
                return "Sonstiges";
        }
    }

}
