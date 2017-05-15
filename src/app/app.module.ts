import {BrowserModule} from "@angular/platform-browser";
import {NgModule, LOCALE_ID} from "@angular/core";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {TabsModule} from "ng2-bootstrap/tabs";
import {AppRoutingModule} from "./app-routing.module";
import {ClubService} from "./service/club.service";
import {LoginService} from "./service/login.service";
import {EventService} from "./service/event.service";
import {PersonService} from "./service/person.service";
import {DataService} from "./service/data.service";
import {ExerciseService} from "./service/exercise.service";
import {AppComponent} from "./app.component";
import {PersonDetailComponent} from "./component/person-detail/person-detail.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {ClubInfoComponent} from "./club-info/club-info.component";
import {ClubDetailComponent} from "./component/club-detail/club-detail.component";
import {TeamComponent} from "./component/team/team.component";
import {FooterComponent} from "./footer/footer.component";
import {EventsOverviewComponent} from "./component/events-overview/events-overview.component";
import {EventCardComponent} from "./component/event-card/event-card.component";
import {NotFoundComponent} from "./component/not-found/not-found.component";
import {EventsComponent} from "./component/events/events.component";
import {EventDetailComponent} from "./component/event-detail/event-detail.component";
import {ParticipantsComponent} from "./component/participants/participants.component";
import {ExercisesComponent} from "./component/exercises/exercises.component";
import {ExerciseDetailComponent} from "./component/exercise-detail/exercise-detail.component";
import {CKEditorModule} from "ng2-ckeditor";
import {DataTablesModule} from "angular-datatables";
import {AdminGuard} from "./guard/AdminGuard";

@NgModule({
    declarations: [
        AppComponent,
        PersonDetailComponent,
        EventDetailComponent,
        DashboardComponent,
        ClubInfoComponent,
        ClubDetailComponent,
        TeamComponent,
        FooterComponent,
        EventsOverviewComponent,
        EventCardComponent,
        NotFoundComponent,
        EventsComponent,
        ParticipantsComponent,
        ExercisesComponent,
        ExerciseDetailComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        TabsModule.forRoot(),
        CKEditorModule,
        DataTablesModule
    ],
    providers: [AdminGuard, ClubService, PersonService, LoginService, ExerciseService, EventService, DataService,
        {provide: LOCALE_ID, useValue: "de-DE"}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
