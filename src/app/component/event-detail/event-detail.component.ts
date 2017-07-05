import {Component, OnInit, ElementRef} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {Location} from "@angular/common";
import {CommonComponent} from "../common.component";
import {EventService} from "../../service/event.service";
import {Event} from "../../model/event";
import {DataService} from "../../service/data.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Exercise} from "../../model/exercise";
import {ExerciseService} from "../../service/exercise.service";
import {TrainingElement} from "../../model/trainingelement";
import {ExerciseView} from "../../model/exerciseview";

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent extends CommonComponent implements OnInit {

    selectedEvent:Event;

    /**
     * event for the component.
     */
    event:Event;

    /**
     * training elements of the event (if the event is a training event).
     */
    trainingelements:TrainingElement[];

    viewMode:boolean = true;

    eventForm:FormGroup;

    /**
     * all available exercises.
     */
    allExercises:Exercise[];

    /**
     * to the training assigned exercises.
     */
    assignedExercises:ExerciseView[];

    /**
     * selected exercise to add.
     */
    selectedExerciseId:number;

    constructor(private element:ElementRef, private router:Router, loginService:LoginService, route:ActivatedRoute, private eventService:EventService,
                location:Location, private dataService:DataService, private formBuilder:FormBuilder,
                private exerciseService:ExerciseService) {
        super(loginService, location);

        this.event = this.dataService.currentEvent;

        this.eventForm = this.formBuilder.group({
            eventId: [this.event.eventId],
            teamId: [this.event.teamId],
            eventType: [this.event.eventType],
            date: [{value: this.event.date, disabled: this.viewMode}, Validators.required],
            endtime: [{value: this.event.endtime, disabled: this.viewMode}, Validators.required],
            begintime: [{value: this.event.begintime, disabled: this.viewMode}, Validators.required],
            gettogethertime: [{value: this.event.gettogethertime, disabled: this.viewMode}, Validators.required],
            street: [{value: this.event.street, disabled: this.viewMode}, Validators.required],
            zipcode: [{value: this.event.zipcode, disabled: this.viewMode}, Validators.required],
            city: [{value: this.event.city, disabled: this.viewMode}, Validators.required],
            exercises: this.formBuilder.array([{value: [], disabled: this.viewMode}])
        });

        if (this.isTraining()) {
            this.exerciseService.getExercises().then(exercises => {
                this.allExercises = exercises
                this.eventService.getTrainingelements(this.event.eventId).then(elements => {
                    this.trainingelements = elements as Array<TrainingElement>;

                    this.patchExercises();
                    if (this.allExercises.length > 0) {
                        this.selectedExerciseId = this.allExercises[0].exerciseid;
                    }
                });
            });

        }
    }

    patchExercises() {
        this.eventForm.patchValue({
            exercises: [this.getExercises()]
        });
    }

    showExerciseDetail(exerciseId:number) {
        this.router.navigate(['/exercisedetail', exerciseId]);
    }

    getExerciseName(exerciseId:number):string {
        let filterExercises = this.allExercises.filter(exercise => exercise.exerciseid === exerciseId);
        if (filterExercises.length === 1) {
            return filterExercises[0].name;
        }
        return 'unbekannt';
    }

    selectEvent() {
        this.selectedEvent = this.event;
    }

    unselectEvent() {
        this.selectedEvent = null;
    }

    ngOnInit() {
    }

    getExercises():ExerciseView[] {
        if (this.isTraining() && this.trainingelements.length > 0) {
            this.assignedExercises = this.trainingelements.map(element =>
                new ExerciseView(element.exerciseid, this.getExerciseName(element.exerciseid)));
            return this.assignedExercises;
        }
        return [];
    }

    setViewMode(viewMode:boolean) {
        if (viewMode) {
            Object.values(this.eventForm.controls).forEach(function (control) {
                control.disable();
            });
        } else {
            Object.values(this.eventForm.controls).forEach(function (control) {
                control.enable();
            });
        }
        this.viewMode = viewMode;
    }

    isTraining():boolean {
        return this.event.eventType === 'training';
    }

    save(model:Event, isValid:boolean):void {
        console.log("Save event...");
        this.event = model;
        if (this.event.eventType === 'training') {
            this.eventService.updateTrainingelements(this.trainingelements, this.event.eventId);
        }

        this.eventService.update(this.event)
            .then(() => this.goBack());
    }

    getEventImage(eventType) {
        switch (eventType) {
            case 'match':
                return "../../assets/Spiel_500.jpg";
            case 'tournament':
                return "../../assets/Turnier_500.jpg";
            case 'teamevent':
                return "../../assets/Teamevent_500.jpg";
            default: // training
                return "../../assets/Training_500.jpg";
        }
    }

    removeExercise(exerciseId:number) {
        this.trainingelements = this.trainingelements.filter(element => element.exerciseid !== exerciseId);
        this.patchExercises();
    }

    addExercise() {
        if (typeof this.assignedExercises === 'undefined' ||
            this.assignedExercises.filter(element => element.exerciseid === this.selectedExerciseId).length === 0) {
            this.trainingelements.push(new TrainingElement(this.event.eventId, this.selectedExerciseId));
            this.patchExercises();
        }
    }

    onExerciseChange(selectedExerciseId:string) {
        this.selectedExerciseId = Number(selectedExerciseId);
    }
}
