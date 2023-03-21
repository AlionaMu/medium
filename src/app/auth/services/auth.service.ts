import { AuthResponseInterface } from './../types/authResponse.interface';
import { RegistrationRequestInterface } from './../types/registrationRequest.interface';
import { Injectable } from "@angular/core";
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { map, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { LoginRequestInterface } from '../types/loginRequest.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  registration(data: RegistrationRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users'
    return this.http.post<AuthResponseInterface>(url, data)
    .pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login'
    return this.http.post<AuthResponseInterface>(url, data)
    .pipe(map(this.getUser))
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user'

    return this.http.get<any>(url).pipe(map(this.getUser))
  }
}
