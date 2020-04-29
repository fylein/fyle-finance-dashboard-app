import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { CallbackComponent } from './components/auth/callback/callback.component';
import { AuthComponent } from './components/auth/auth.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { BaseComponent } from './components/base/base.component';

import { AuthGuard } from './components/auth/auth.guard'
// import { WorkspacesGuard } from './components/base/workspaces.guard';
import { ConnectionsComponent } from './components/base/connections/connections.component';
import { ExportsComponent } from './components/base/exports/exports.component';
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
    redirectTo: 'workspaces',
    pathMatch: 'full'
  },
];

const baseModuleRoutes: Routes = [
  {
    path: 'workspaces',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ConnectionsComponent },
      { path: 'exports', component: ExportsComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(baseModuleRoutes),
    RouterModule.forRoot(authRoutes),
    HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
