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

@Injectable()
export class RegistrationEffect {
  register$ = createEffect(() => this.actions$.pipe(
    ofType(registrationAction),
    switchMap(({request}) => {
      return this.authService.registration(request).
      pipe(
        map((currentUser: CurrentUserInterface) => {
          this.persistanceService.set('accessToken', currentUser.token)
          // window.localStorage.setItem('accessToken', currentUser.token)
          return registrationSuccessAction({currentUser})
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(registrationFailureAction({errors: errorResponse.error.errors}))
        })
      )
    })
  ))

  redirectAfterSubmit$ = createEffect(() =>
  this.actions$.pipe(
    ofType(registrationSuccessAction),
    tap(() => {
      console.log('success')
      this.router.navigateByUrl('/')
    })
  ), {dispatch: false})

  constructor(private actions$: Actions,
     private authService: AuthService,
     private persistanceService: PersistanceService,
     private router: Router) {}

}
