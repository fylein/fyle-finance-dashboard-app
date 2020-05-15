import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { CallbackComponent } from './components/auth/callback/callback.component';
import { AuthComponent } from './components/auth/auth.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { BaseComponent } from './components/base/base.component';

import { AuthGuard } from './components/auth/auth.guard'
import { ConnectionsComponent } from './components/base/connections/connections.component';
import { ExportsComponent } from './components/base/exports/exports.component';
import { FyleCallbackComponent } from './components/base/fyle-callback/fyle-callback.component';
import { PromptModelComponent } from './components/general/prompt-model/prompt-model.component';

const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'callback',
        component: CallbackComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'enterprise/',
    pathMatch: 'full'
  },
];

const baseModuleRoutes: Routes = [
  {
    path: 'enterprise',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'connections', component: ConnectionsComponent },
      { path: 'exports', component: ExportsComponent },
    ]
  },
  { 
    path: 'fyle/callback', 
    canActivate: [AuthGuard],
    component: FyleCallbackComponent 
  },
  { path: 'error', 
    canActivate: [AuthGuard],
    component: PromptModelComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(baseModuleRoutes),
    RouterModule.forRoot(authRoutes),
    HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
