import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UsersComponent } from './components/home/users/users.component';


const routes: Routes =[
  { path: '' , component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard/:id', component: UsersComponent},

  { path: '**', redirectTo: '/', pathMatch:'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
