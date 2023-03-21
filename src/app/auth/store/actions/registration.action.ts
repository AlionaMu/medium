import { BackendErrorsInterface } from './../../../shared/types/backendErrors.interface';
import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { RegistrationRequestInterface } from './../../types/registrationRequest.interface';
import { createAction, props } from '@ngrx/store'
import { ActionTypes } from '../actionTypes'

export const registrationAction = createAction(
  ActionTypes.REGISTRATION,
  props<{ request: RegistrationRequestInterface}>()
  )

export const registrationSuccessAction = createAction(
  ActionTypes.REGISTRATION_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
  )

  export const registrationFailureAction = createAction(
    ActionTypes.REGISTRATION_FAILURE,
    props<{errors: BackendErrorsInterface}>()
  )
