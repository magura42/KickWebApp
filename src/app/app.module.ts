import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { ClubService } from './service/club.service';
import { PersonService } from './service/person.service';

import { AppComponent } from './app.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClubInfoComponent } from './club-info/club-info.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonDetailComponent,
    DashboardComponent,
    ClubInfoComponent,
    ClubDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ ClubService, PersonService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
