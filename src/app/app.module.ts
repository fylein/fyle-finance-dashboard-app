import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { FyleCallbackComponent } from './components/base/fyle-callback/fyle-callback.component';
import { JwtInterceptor } from './components/auth/jwt.interceptor';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { CdkColumnDef } from '@angular/cdk/table';
import { PromptModelComponent } from './components/general/prompt-model/prompt-model.component';

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
    ExportsComponent,
    FyleCallbackComponent,
    PromptModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    CdkColumnDef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
