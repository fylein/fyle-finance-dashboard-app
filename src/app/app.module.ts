import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { CallbackComponent } from './components/auth/callback/callback.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from './components/base/base.component';
import { LoaderComponent } from './components/general/loader/loader.component';
import { ConnectionsComponent } from './components/base/connections/connections.component';
import {MatListModule} from '@angular/material/list';
import { ExportsComponent } from './components/base/exports/exports.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CallbackComponent,
    LoginComponent,
    LogoutComponent,
    BaseComponent,
    LoaderComponent,
    ConnectionsComponent,
    ExportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatListModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
