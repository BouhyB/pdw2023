import {Component, computed, inject, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardService} from '../../../service/dashboard.service';
import {AuthService} from '@security';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PublicationService} from '../../../feature/publication/service/publication.service';
import {PublicationPayload} from '../../../feature/publication/payload/publication.payload';
import {TypePublicationEnum} from '../../../feature/publication/enum/type-publication.enum';
import {Observable} from 'rxjs';
import {CommentService} from '../../../feature/comment/service/comment.service';
import {Publication} from '../../../feature/publication/model/publication.model';
import {Comment} from '../../../feature/comment/model/comment.model';
import {CommentPayload} from '../../../feature/comment/payload/comment.payload';
import {LikePayload} from '../../../feature/like/payload/like.payload';
import {LikeService} from '../../../feature/like/service/like.service';
import {Profile} from '../../../feature/profile/data/model/profile.model';
import {Like} from '../../../feature/like/model/like.model';

@Component({
  selector: 'app-dashboard-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard-home-page.component.html',
  styleUrls: ['./dashboard-home-page.component.scss']
})
export class DashboardHomePageComponent {

  private readonly dashboardService: DashboardService = inject(DashboardService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly publicationService : PublicationService = inject(PublicationService);
  private readonly commentService : CommentService = inject(CommentService);
  private readonly likeService : LikeService = inject(LikeService);

  publications$: Observable<Publication[]> | undefined = this.publicationService.getPublications();
  comments$ : Observable<Comment[]> | undefined = this.commentService.getCommentsForAPublication();

  commentsNumber$ : Observable<number> | undefined = this.commentService.getCommentNumber();
  publicationsNumber$ : Observable<number> | undefined = this.publicationService.getPublicationNumber();

  lastComment$ : Observable<Comment> | undefined = this.commentService.getLastComment();
  lastPublication$ : Observable<Publication> | undefined = this.publicationService.getLastPublication();
  lastLike$ : Observable<Like> | undefined = this.likeService.getLastLike();


  public formGroupPublish: FormGroup = new FormGroup<any>({
      myContent : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(200)])
    }
  );

  public formGroupComment: FormGroup = new FormGroup<any>({
      myComment : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(200)])
    }
  );

  publish():void{
    const payload : PublicationPayload = { content:this.formGroupPublish.value.myContent, type: TypePublicationEnum.TEXT }
    if (this.formGroupPublish.valid) {
      this.publicationService.publish(payload).subscribe();
    } else {
      if (payload.content.length == 0) {
        alert('Content vide')
      }
    }
  }

  comment(publication : Publication){
    const payload : CommentPayload = {content : this.formGroupComment.value.myComment, publication : publication}
    if(this.formGroupComment.valid){
      this.commentService.comment(payload).subscribe();
    }
  }

  likePublication(publication: Publication) {
    const payload : LikePayload = {publication : publication}
    console.log(payload);
    this.likeService.like(payload).subscribe();
  }

  likeComment(comment: Comment) {
    const payload : LikePayload = {comment : comment}
    console.log(payload);
    this.likeService.like(payload).subscribe();
  }

  deletePublication(publication : Publication){
    this.publicationService.delete(publication.publication_id).subscribe();
  }

  getNumberLikesPublication(publication: Publication) : number {
    //this.likeService.listLike().subscribe((value: Like[]) => console.log(value))
    return 0;
  }

  getNumberLikesComment(comment: Comment) : number {
    return 0;
  }


  Home() {
    this.dashboardService.home()
  }

  MyProfile() {
    this.dashboardService.myProfile()
  }

  LogOut(){
    this.authService.logOut();
  }

}
