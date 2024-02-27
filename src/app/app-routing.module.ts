import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UsersComponent } from './components/home/users/users.component';
import { DatePipe } from '@angular/common';
import { SeeuserComponent } from './components/see/seeuser/seeuser.component';


const routes: Routes =[
  { path: '' , component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard/:idLogin', component: UsersComponent},
  { path: 'dashboard/:idLogin/update/:id', component: UsersComponent},
  { path: 'dashboard/:idLogin/information/:id', component: SeeuserComponent},

  { path: '**', redirectTo: '/', pathMatch:'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    DatePipe
  ]
})
export class AppRoutingModule { }
