import { isSubmittingSelector, validationErrorsSelector } from './../store/selectors';
import { registrationAction } from './../store/actions/registration.action';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RegistrationRequestInterface } from '../types/registrationRequest.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'mc-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public form: FormGroup = {} as FormGroup;
  public isSubmitting$: Observable<boolean> = {} as Observable<boolean>
  public backendErrors$: Observable<BackendErrorsInterface | null> = {} as Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', (Validators.required)],
      email: '',
      password: ''
    })

  }

  onSubmit():void {
    const request: RegistrationRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(registrationAction({request}))
  }
}
