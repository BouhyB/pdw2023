import {inject, Injectable} from '@angular/core';
import {PublicationPayload} from '../payload/publication.payload';
import {map, Observable, tap} from 'rxjs';
import {ApiResponse, ApiService, ApiURI} from '@api';
import {AppNode} from '@shared';
import {Router} from '@angular/router';
import {Publication} from '../model/publication.model';

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
          this.router.navigate([AppNode.FALL_BACK]).then();
          this.router.navigate([AppNode.REDIRECT_TO_AUTHENTICATED]).then();
        }

      })
    );
  }

  getPublications() : any{
    return this.api.get(ApiURI.LIST_PUBLICATION).pipe(
      map((response : ApiResponse)=> {
        this.router.navigate([AppNode.REDIRECT_TO_AUTHENTICATED]).then();
        return response.data
      })
    )
  }

  getPublicationNumber() {
    return this.api.get(ApiURI.PUBLICATION_NUMBER).pipe(
      map((response : ApiResponse)=> {
        return response.data
      })
    )
  }

  getLastPublication() {
    return this.api.get(ApiURI.LAST_PUBLICATION).pipe(
    map((response : ApiResponse)=> {
      return response.data
    })
  )
  }

  delete(publication_id: string) {
    return this.api.delete(ApiURI.DELETE_PUBLICATION, publication_id).pipe(
      tap((response: ApiResponse) => {
        if (response.result) {
          this.router.navigate([AppNode.REDIRECT_TO_AUTHENTICATED]).then();
        }

      })
    );
  }
}
