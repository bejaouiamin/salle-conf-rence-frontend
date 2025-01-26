import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalleListComponent } from './salle-list/salle-list.component';
import { ReservationComponent } from './reservation/reservation.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { SalleManagementComponent } from './salle-management/salle-management.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';
import { AdminReminderComponent } from './admin-reminder/admin-reminder.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'salle', component: SalleListComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'equipment', component: EquipmentComponent,canActivate: [AuthGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } },
  { path: 'user-dashboard',component: UserDashboardComponent,canActivate: [AuthGuard],data: { roles: ['user'] } },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'sallemanagement', component: SalleManagementComponent ,canActivate: [AuthGuard]},
  { path: 'user-reservation', component: UserReservationsComponent,canActivate: [AuthGuard],data: { roles: ['user'] }  },
  { path: 'admin-Reminder', component: AdminReminderComponent,canActivate: [AuthGuard, RoleGuard], data: { roles: ['admin'] } },
  { path: '**', redirectTo: '/home' } // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
