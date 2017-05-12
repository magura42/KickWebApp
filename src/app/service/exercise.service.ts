import {Injectable} from "@angular/core";
import {Exercise} from "../model/exercise";
import {environment} from "../../environments/environment";
import "rxjs/add/operator/toPromise";
import {CommonService} from "./common.service";
import {Http} from "@angular/http";

@Injectable()
export class ExerciseService extends CommonService {

    constructor(private http:Http) {
        super();
    }

    getExercise(exerciseid:number):Promise<Exercise> {

        const url = `${environment.backendUrl}exercise/${exerciseid}`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(response =>
                response.json() as Exercise)
            .catch(this.handleError);
    }

    update(exercise:Exercise):Promise<Exercise> {
        const url = `${environment.backendUrl}exercise/${exercise.exerciseid}`;
        return this.http
            .put(url, JSON.stringify(exercise), {headers: this.headers})
            .toPromise()
            .then(() => exercise)
            .catch(this.handleError);
    }

    create(exercise:Exercise):Promise<Exercise> {
        const url = `${environment.backendUrl}exercise`;
        return this.http
            .post(url, JSON.stringify(exercise), {headers: this.headers})
            .toPromise()
            .then(() => exercise)
            .catch(this.handleError);
    }

    getExercises():Promise<Exercise[]> {
        const url = `${environment.backendUrl}exercise`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(response =>
                response.json() as Exercise[])
            .catch(this.handleError);
    }

}
