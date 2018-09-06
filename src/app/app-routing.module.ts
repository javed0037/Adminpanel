import { AddUserComponent } from './views/add-user/add-user.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.component';
import { ChangePasswordComponent } from './views/admin/change-password/change-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';

import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ForgotPasswordComponent }  from'./views/admin/forgot-password/forgot-password.component';
import { LayoutComponent } from './views/layout/layout.component';
// import { AuthService } from './services/admin/admin.service';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    component:LayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'add-user',
        component: AddUserComponent
      },
      {
        path: 'user-dashboard',
        component: UserDashboardComponent
      },
    ]
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
 

  {
    path: 'reset-password',
    component: ChangePasswordComponent
  },
  // {
  //   path: '',
  //   component: LoginComponent
  // },
      {
        path: '**',
        component: LoginComponent
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
