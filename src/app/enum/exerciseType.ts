export enum ExerciseType {
    warmup = "Aufwärmen",
    shot = "Torschuss"
}

namespace ExerciseType {
    export function toString(exerciseType: ExerciseType) {
        switch (exerciseType) {
            case ExerciseType.warmup:
                return "Aufwärmen"
            case ExerciseType.shot:
                return "Torschuss";
            default:
                return "Sonstiges";
        }
    }
}