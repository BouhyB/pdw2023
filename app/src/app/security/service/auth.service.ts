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
  /*private readonly api:ApiService = inject(ApiService);
  private isAuthenticated: boolean = false;

  public signIn(payload: SignInPayload): Observable<any>{
    console.log('signin');
    this.isAuthenticated = true;
    return this.api.post(ApiURI.SIGN_IN,payload);
  }
  public signUp(payload: SignUpPayload): Observable<any>{
    console.log('signup');
    return this.api.post(ApiURI.SIGN_UP, payload);
  }*/
  private readonly api: ApiService = inject(ApiService);
  private readonly tokenService: TokenService = inject(TokenService);
  //private readonly accountUtils: AccountUtilsService = inject(AccountUtilsService);
  private readonly router: Router = inject(Router);
 // account$: WritableSignal<Account> = signal(this.accountUtils.getEmpty());

  constructor() {
    effect(() => this.handleAuthenticatedChange(this.tokenService.token()));
    //effect(() => this.handleChangeAccountTheme(this.account$()));
  }
  signIn(payload: SignInPayload): Observable<ApiResponse> {
    return this.api.post(ApiURI.SIGN_IN, payload).pipe(
      tap((response: ApiResponse) => {
        //if success then goToDashboard and save token
        if (response.result) {
          this.router.navigate([AppNode.REDIRECT_TO_AUTHENTICATED]).then()
          this.tokenService.setToken({...response.data, isEmpty: false});
        }
      })
    );
  }
  signUp(payload: SignUpPayload): Observable<ApiResponse> {
    return this.api.post(ApiURI.SIGN_UP, payload).pipe(
      tap((response: ApiResponse) => {
        //if success then goToDashboard and save token
        if (response.result) {
          //this.router.
          this.router.navigate([AppNode.REDIRECT_TO_AUTHENTICATED]).then()
          this.tokenService.setToken({...response.data, isEmpty: false});
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
          //this.account$.set(this.accountUtils.fromDTO(response.data));
          //http://localhost:4200/landing/01HGR2MZ0WE5QS7P8W14ARP6QR
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

}
