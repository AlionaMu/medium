import { AuthService } from './../services/auth.service';
import { isSubmittingSelector, validationErrorsSelector } from './../store/selectors';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { loginAction } from '../store/actions/login.action';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup = {} as FormGroup;
  public isSubmitting$: Observable<boolean> = {} as Observable<boolean>
  public backendErrors$: Observable<BackendErrorsInterface | null> = {} as Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
    console.log(this.isSubmitting$)
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: '',
      password: ''
    })

  }

  onSubmit():void {
    console.log(this.form.value)
    const request: LoginRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(loginAction({request}))
  }
}
