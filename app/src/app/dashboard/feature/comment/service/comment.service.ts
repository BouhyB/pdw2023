import {inject, Injectable} from '@angular/core';
import {ApiResponse, ApiService, ApiURI} from '@api';
import {Router} from '@angular/router';
import {map, Observable, tap} from 'rxjs';
import {AppNode} from '@shared';
import {CommentPayload} from '../payload/comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private readonly api: ApiService = inject(ApiService),
              private readonly router: Router = inject(Router)) {
  }

  getCommentsForAPublication() : any{
    return this.api.get(ApiURI.LIST_COMMENT).pipe(
      map((response : ApiResponse)=> {
        this.router.navigate([AppNode.FALL_BACK]).then();
        this.router.navigate([AppNode.REDIRECT_TO_AUTHENTICATED]).then();
        return response.data
      })
    )
  }

  comment(payload : CommentPayload):Observable<ApiResponse> {
    return this.api.post(ApiURI.COMMENT, payload).pipe(
      tap((response: ApiResponse) => {
        if (response.result) {
          console.log(response)
          this.router.navigate([AppNode.REDIRECT_TO_AUTHENTICATED]).then();
        }
      })
    );
  }

  getCommentNumber() {
    return this.api.get(ApiURI.COMMENT_NUMBER).pipe(
      map((response : ApiResponse)=> {
        return response.data
      })
    )
  }
  getLastComment() {
    return this.api.get(ApiURI.LAST_COMMENT).pipe(
      map((response : ApiResponse)=> {
        return response.data
      })
    )
  }
}
