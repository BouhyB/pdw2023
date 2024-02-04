import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {ApiResponse, ApiService, ApiURI, TokenService} from '@api';
import {Router} from '@angular/router';
import {AppNode, Payload} from '@shared';
import {ProfilePayload} from '../data/payload/profile.payload';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly api: ApiService = inject(ApiService);
  private readonly router: Router = inject(Router);
  List$: WritableSignal<string[]> = signal(['test user', 'test user2'])
  Detail$: WritableSignal<string> = signal('');

  getDetail() : any {
    return this.api.get(ApiURI.DETAIL).pipe(
      map((response: ApiResponse)=> {
        if(response.result){
          console.log(response)
          return response.data
        }
      })
    )
  }


  update(payload: ProfilePayload) {
    return this.api.put(ApiURI.UPDATE_PROFILE, payload).pipe(
      tap((response: ApiResponse)=> {
        if(response.result){
          console.log(response)
          this.router.navigate([AppNode.DETAIL]).then()
        }
      })
    )
  }

  modifyProfile() {
    this.router.navigate([AppNode.UPDATE_PROFILE]).then()
  }
}
