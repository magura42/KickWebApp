import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { ClubService } from './service/club.service';
import { LoginService } from './service/login.service';
import { PersonService } from './service/person.service';

import { AppComponent } from './app.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClubInfoComponent } from './club-info/club-info.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonDetailComponent,
    DashboardComponent,
    ClubInfoComponent,
    ClubDetailComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ ClubService, PersonService, LoginService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
