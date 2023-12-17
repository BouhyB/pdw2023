import {inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SignUpPayload} from '../page/data/payload/sign-up.payload';
import {ApiService, ApiURI} from '@api';
import {SignInPayload} from '../page/data/payload/sign-in.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api:ApiService = inject(ApiService);

  public signIn(payload: SignInPayload): Observable<any>{
    return this.api.post(ApiURI.SIGN_IN,payload);
  }
  public signUp(payload: SignUpPayload): Observable<any>{
    return of(null);
  }

}
