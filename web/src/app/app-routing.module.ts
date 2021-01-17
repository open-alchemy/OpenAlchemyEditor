import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';
import { ErrorComponent } from './components/error/error.component';
import { BaseComponent } from './components/base/base.component';
import { SignInCompleteComponent } from './components/sign-in-complete/sign-in-complete.component';

const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'example/:id', redirectTo: '/examples/:id' }, // legacy route, there so links don't break
  { path: 'examples/:id', component: BaseComponent },
  { path: 'specs/:id', component: BaseComponent, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorComponent },
  {
    path: 'sign-in-complete',
    component: SignInCompleteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
