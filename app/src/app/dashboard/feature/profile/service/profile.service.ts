import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {ApiResponse, ApiService, ApiURI, TokenService} from '@api';
import {Router} from '@angular/router';
import {Payload} from '@shared';
import {ProfilePayload} from '../data/payload/profile.payload';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly api: ApiService = inject(ApiService);
  private readonly router: Router = inject(Router);
  List$: WritableSignal<string[]> = signal(['test user', 'test user2'])
  Detail$: WritableSignal<string> = signal('');

  getDetail(): Observable<ApiResponse>{
    return this.api.get(ApiURI.DETAIL).pipe(
      tap((response: ApiResponse)=> {
        if(response.result){

        }
      })
    )
  }

}
