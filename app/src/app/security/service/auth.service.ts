import {inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SignUpPayload} from '../page';
import {ApiService, ApiURI} from '@api';
import {SignInPayload} from '../page';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api:ApiService = inject(ApiService);

  public signIn(payload: SignInPayload): Observable<any>{
    console.log('signin');
    return this.api.post(ApiURI.SIGN_IN,payload);
  }
  public signUp(payload: SignUpPayload): Observable<any>{
    console.log('signup');
    return this.api.post(ApiURI.SIGN_UP, payload);
  }

}
