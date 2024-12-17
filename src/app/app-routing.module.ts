import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalleListComponent } from './components/salle-list/salle-list.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import {EquipmentComponent} from "./components/equipment/equipment.component";
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';

const routes: Routes = [

  { path: '', component: SalleListComponent },
  { path: 'salle', component: SalleListComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'equipment', component: EquipmentComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'login', component: LoginRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
