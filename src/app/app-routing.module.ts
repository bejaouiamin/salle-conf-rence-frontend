import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalleListComponent } from './salle-list/salle-list.component';
import { ReservationComponent } from './reservation/reservation.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'salle', component: SalleListComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'equipment', component: EquipmentComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: '**', redirectTo: '/home' } // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
