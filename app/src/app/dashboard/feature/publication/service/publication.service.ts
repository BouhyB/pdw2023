import {inject, Injectable} from '@angular/core';
import {PublicationPayload} from '../payload/publication.payload';
import {map, Observable, tap} from 'rxjs';
import {ApiResponse, ApiService, ApiURI} from '@api';
import {AppNode} from '@shared';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private readonly api: ApiService = inject(ApiService),
  private readonly router: Router = inject(Router)) {
  }
  publish(payload : PublicationPayload) : Observable<ApiResponse>{
    return this.api.post(ApiURI.PUBLISH, payload).pipe(
      tap((response: ApiResponse) => {
        if (response.result) {
          this.router.navigate([AppNode.REDIRECT_TO_AUTHENTICATED]).then();
        }

      })
    );
  }

  getPublications() : any{
    return this.api.get(ApiURI.LIST_PUBLICATION).pipe(
      map((response : ApiResponse)=> {
        this.router.navigate([AppNode.FALL_BACK]).then();
        this.router.navigate([AppNode.REDIRECT_TO_AUTHENTICATED]).then();
        return response.data
      })
    )
  }

}
