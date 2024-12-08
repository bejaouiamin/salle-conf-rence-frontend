import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalleListComponent } from './components/salle-list/salle-list.component';
import { ReservationComponent } from './components/reservation/reservation.component';

const routes: Routes = [

  { path: '', component: SalleListComponent },
  { path: 'salle', component: SalleListComponent },
  { path: 'reservation', component: ReservationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
