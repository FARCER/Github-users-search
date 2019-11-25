import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UserComponent} from './components/user/user.component';
import {UsersListComponent} from './components/users-list/users-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserPrevComponent} from './components/user-prev/user-prev.component';
import {UserService} from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersListComponent,
    UserPrevComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
