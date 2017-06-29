export class TrainingElement {
    trainingelementid:number;
    trainingid:number;
    exerciseid:number;

    constructor(trainingid:number, exerciseid:number) {
        this.trainingelementid = -1;
        this.exerciseid = exerciseid;
        this.trainingid = trainingid;
    }
}