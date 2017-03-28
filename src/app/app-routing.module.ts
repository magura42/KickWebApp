import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonDetailComponent }  from './component/person-detail/person-detail.component';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { ClubDetailComponent }  from './component/club-detail/club-detail.component';
import { ClubInfoComponent }  from './club-info/club-info.component';
import { TeamComponent }  from './component/team/team.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import {EventsComponent} from "./component/events/events.component";

const routes: Routes = [
    { path: 'dashboard/:id', component: DashboardComponent },
    { path: 'team/:id', component: TeamComponent },
    { path: 'events', component: EventsComponent },
    { path: 'persondetail/:id', component: PersonDetailComponent },
    { path: 'clubinfo', component: ClubInfoComponent },
    { path: 'clubdetail/:id', component: ClubDetailComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404'}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
