import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './components/user/user.component';
import {UsersListComponent} from './components/users-list/users-list.component';

const routes: Routes = [
  {path: 'user/:login', component: UserComponent},
  {path: '', component: UsersListComponent},
  {path: '**', component: UsersListComponent},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
