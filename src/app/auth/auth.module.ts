import { GetCurrentUserEffect } from './store/effects/getCurrentUser.effect';
import { LoginEffect } from './store/effects/login.effect';
import { PersistanceService } from './../shared/services/persistance.service';
import { BackendErrorMessagesModule } from './../shared/modules/backendErrorMessages/backendErrorMessages.module';
import { RegistrationEffect } from './store/effects/registration.effect';
import { AuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegistrationEffect, LoginEffect, GetCurrentUserEffect]),
    BackendErrorMessagesModule
  ],
  declarations: [
    RegistrationComponent,
    LoginComponent
  ],
  providers: [ AuthService, PersistanceService ]
})
export class AuthModule { }
