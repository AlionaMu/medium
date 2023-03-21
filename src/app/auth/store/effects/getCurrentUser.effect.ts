import { PersistanceService } from './../../../shared/services/persistance.service';
import { BackendErrorsInterface } from './../../../shared/types/backendErrors.interface';
import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { AuthService } from './../../services/auth.service';
import { registrationAction, registrationSuccessAction, registrationFailureAction } from './../actions/registration.action';
import { Injectable } from "@angular/core";
import { createEffect } from "@ngrx/effects";
import { Actions, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction } from '../actions/getCurrentUser.action';

@Injectable()
export class GetCurrentUserEffect {
  getCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(getCurrentUserAction),
    switchMap(() => {
      const token = this.persistanceService.get('accessToken')
      if(!token) {
        return of(getCurrentUserFailureAction())
      }
      return this.authService.getCurrentUser().
      pipe(
        map((currentUser: CurrentUserInterface) => {
          return getCurrentUserSuccessAction({currentUser})
        }),
        catchError(() => {
          return of(getCurrentUserFailureAction())
        })
      )
    })
  ))

  constructor(private actions$: Actions,
     private authService: AuthService,
     private persistanceService: PersistanceService) {}

}
