import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { C404Component } from './components/c404/c404.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: UsersListComponent},
  {path: 'user/:id', component: UserDetailComponent},
  {path: 'new-user', component: FormComponent},
  {path: "**", component: C404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
