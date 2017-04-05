import {BrowserModule} from "@angular/platform-browser";
import {NgModule, LOCALE_ID} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {TabsModule} from "ng2-bootstrap/tabs";
import {AppRoutingModule} from "./app-routing.module";
import {ClubService} from "./service/club.service";
import {LoginService} from "./service/login.service";
import {EventService} from "./service/event.service";
import {PersonService} from "./service/person.service";
import {AppComponent} from "./app.component";
import {PersonDetailComponent} from "./component/person-detail/person-detail.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ClubInfoComponent} from "./club-info/club-info.component";
import {ClubDetailComponent} from "./component/club-detail/club-detail.component";
import {TeamComponent} from "./component/team/team.component";
import {FooterComponent} from "./footer/footer.component";
import {EventsOverviewComponent} from "./events-overview/events-overview.component";
import {EventCardComponent} from "./event-card/event-card.component";
import {NotFoundComponent} from "./component/not-found/not-found.component";
import {EventsComponent} from "./component/events/events.component";
import {CKEditorModule} from "ng2-ckeditor";
import { DataTablesModule } from 'angular-datatables';

@NgModule({
    declarations: [
        AppComponent,
        PersonDetailComponent,
        DashboardComponent,
        ClubInfoComponent,
        ClubDetailComponent,
        TeamComponent,
        FooterComponent,
        EventsOverviewComponent,
        EventCardComponent,
        NotFoundComponent,
        EventsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        TabsModule.forRoot(),
        CKEditorModule,
        DataTablesModule
    ],
    providers: [ClubService, PersonService, LoginService, EventService,
        { provide: LOCALE_ID, useValue: "de-DE" }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
