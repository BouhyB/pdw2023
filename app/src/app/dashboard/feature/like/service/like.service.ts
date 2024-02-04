import {inject, Injectable} from '@angular/core';
import {ApiResponse, ApiService, ApiURI} from '@api';
import {Router} from '@angular/router';
import {CommentPayload} from '../../comment/payload/comment.payload';
import {map, Observable, tap} from 'rxjs';
import {AppNode} from '@shared';
import {LikePayload} from '../payload/like.payload';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  constructor(private readonly api: ApiService = inject(ApiService)) {
  }

  like(payload : LikePayload):Observable<ApiResponse> {
    return this.api.post(ApiURI.LIKE, payload).pipe(
      tap((response: ApiResponse) => {
        if (response.result) {
          console.log(response)
        }
      })
    );
  }
  listLike():any {
    return this.api.get(ApiURI.LIST_LIKE).pipe(
      map((response: ApiResponse) => {
        if (response.result) {
          console.log(response)
          return response.data
        }
      })
    );
  }

  getLastLike() {
    return this.api.get(ApiURI.LAST_LIKE).pipe(
      map((response : ApiResponse)=> {
        return response.data
      })
    )
  }
}
