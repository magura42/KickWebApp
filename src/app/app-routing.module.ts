import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PersonDetailComponent} from "./component/person-detail/person-detail.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {ClubDetailComponent} from "./component/club-detail/club-detail.component";
import {ClubInfoComponent} from "./club-info/club-info.component";
import {TeamComponent} from "./component/team/team.component";
import {NotFoundComponent} from "./component/not-found/not-found.component";
import {EventsComponent} from "./component/events/events.component";
import {ExercisesComponent} from "./component/exercises/exercises.component";
import {EventDetailComponent} from "./component/event-detail/event-detail.component";
import {AdminGuard} from "./guard/AdminGuard";
import {ExerciseDetailComponent} from "./component/exercise-detail/exercise-detail.component";

const routes:Routes = [
    {path: 'dashboard/:teamId', component: DashboardComponent},
    {path: 'team/:id', component: TeamComponent},
    {path: 'events/:teamId', component: EventsComponent},
    {path: 'exercises', component: ExercisesComponent, canActivate: [AdminGuard]},
    {path: 'persondetail/:id', component: PersonDetailComponent},
    {path: 'eventdetail', component: EventDetailComponent},
    {path: 'clubinfo', component: ClubInfoComponent},
    {path: 'clubdetail/:id', component: ClubDetailComponent},
    {path: 'exercisedetail/:id', component: ExerciseDetailComponent},
    {path: '404', component: NotFoundComponent},
    {path: '**', redirectTo: '404'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
