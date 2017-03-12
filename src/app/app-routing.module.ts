import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonDetailComponent }  from './person-detail/person-detail.component';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { ClubDetailComponent }  from './club-detail/club-detail.component';
import { ClubInfoComponent }  from './club-info/club-info.component';
import { TeamComponent }  from './team/team.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'team', component: TeamComponent },
    { path: 'persondetail/:id', component: PersonDetailComponent },
    { path: 'clubinfo', component: ClubInfoComponent },
    { path: 'clubdetail', component: ClubDetailComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
