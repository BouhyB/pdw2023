import {effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Observable, of, tap} from 'rxjs';
import {SignUpPayload} from '../page';
import {ApiResponse, ApiService, ApiURI, Token, TokenService} from '@api';
import {SignInPayload} from '../page';
import {Router} from '@angular/router';
import {AppNode} from '@shared';
import {DashboardGuard} from '../../dashboard/dashboard.guard';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api: ApiService = inject(ApiService);
  private readonly tokenService: TokenService = inject(TokenService);
  private readonly router: Router = inject(Router);

  constructor() {
    effect(() => this.handleAuthenticatedChange(this.tokenService.token()));
  }
  signIn(payload: SignInPayload): Observable<ApiResponse> {
    return this.api.post(ApiURI.SIGN_IN, payload).pipe(
      tap((response: ApiResponse) => {
        if (response.result) {
          this.logOut()
          this.router.navigate([AppNode.REDIRECT_TO_AUTHENTICATED]).then()
          this.tokenService.setToken({...response.data, isEmpty: false});
        }
      })
    );
  }
  signUp(payload: SignUpPayload): Observable<ApiResponse> {
    return this.api.post(ApiURI.SIGN_UP, payload).pipe(
      tap((response: ApiResponse) => {
        if (response.result) {
          this.router.navigate([AppNode.PUBLIC + "/" + AppNode.SIGN_IN]).then()
          //this.tokenService.setToken({...response.data, isEmpty: false});
        }
      })
    );
  }
  logOut(): void {
    this.tokenService.setToken({token: '', refreshToken: '', isEmpty: true});
  }
  me() {
    this.api.get(ApiURI.ME)
      .pipe(tap((response: ApiResponse) => {
        if (response.result) {
          if (!window.location.pathname.startsWith('/' + AppNode.REDIRECT_TO_AUTHENTICATED) && !window.location.pathname.startsWith('/landing')) {
            this.router.navigate([AppNode.REDIRECT_TO_AUTHENTICATED]).then();
          }
        } else {
          this.router.navigate([AppNode.REDIRECT_TO_PUBLIC]).then();
        }
      }))
      .subscribe();
  }

  private handleAuthenticatedChange(token: Token): void {
    if (!token.isEmpty) {
      this.me();
    } else {
      this.router.navigate([AppNode.REDIRECT_TO_PUBLIC]).then();
    }
  }

  GoToSignUp(){
    this.router.navigate([AppNode.PUBLIC+'/'+AppNode.SIGN_UP]).then();
  }

  GoToSignIn(){
    this.router.navigate([AppNode.PUBLIC+'/'+AppNode.SIGN_IN]).then();
  }

}
