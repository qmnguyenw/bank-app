import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAccountComponent } from './add-account/add-account.component';
import { ListAccountComponent } from './list-account/list-account.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
const routes: Routes = [
  {
    component: AddAccountComponent,
    canActivate: [AuthGuardService],
    path: 'add'
  },
  {
    component: ListAccountComponent,
    canActivate: [AuthGuardService],
    path: 'accounts/:N'
  },
  {
    component:UpdateAccountComponent,
    canActivate: [AuthGuardService],
    path: 'updateAccount/:id'
  },
  { component: HomeComponent,
    path: ''
  },
  { component: LoginComponent,
    path: 'login'
  },
  { component: RegisterComponent,
    path: 'register'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
