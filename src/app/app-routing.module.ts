import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonDetailComponent }  from './person-detail/person-detail.component';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { ClubDetailComponent }  from './club-detail/club-detail.component';
import { ClubInfoComponent }  from './club-info/club-info.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'persondetail/:id', component: PersonDetailComponent },
    { path: 'clubinfo/:id', component: ClubInfoComponent },
    { path: 'clubdetail/:id', component: ClubDetailComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
