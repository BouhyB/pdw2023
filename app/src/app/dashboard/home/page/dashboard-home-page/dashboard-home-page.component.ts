import {
  Component,
  computed,
  inject,
  OnChanges,
  OnInit,
  signal,
  Signal,
  SimpleChanges,
  WritableSignal
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardService} from '../../../service/dashboard.service';
import {AuthService} from '@security';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, switchMap, tap} from 'rxjs';
import {ApiResponse} from '@api';
import {
  Comment,
  CommentPayload,
  CommentService,
  Like, LikePayload,
  LikeService,
  Publication,
  PublicationPayload,
  PublicationService,
  TypePublicationEnum
} from '@feature';

@Component({
  selector: 'app-dashboard-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard-home-page.component.html',
  styleUrls: ['./dashboard-home-page.component.scss']
})
export class DashboardHomePageComponent implements OnInit{

  private readonly dashboardService: DashboardService = inject(DashboardService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly publicationService : PublicationService = inject(PublicationService);
  private readonly commentService : CommentService = inject(CommentService);
  private readonly likeService : LikeService = inject(LikeService);


  publicationsSubject = new BehaviorSubject<Publication[]>([]);
  //publications$: Observable<Publication[]> = this.publicationService.getPublications();
  publications$: Observable<Publication[]> = this.publicationsSubject.asObservable();

  commentSubject = new BehaviorSubject<Comment[]>([]);
  //comments$ : Observable<Comment[]> = this.commentService.getCommentsForAPublication();
  comments$ : Observable<Comment[]> = this.commentSubject.asObservable();

  commentNumberSubject = new BehaviorSubject<number>(0);
  //commentsNumber$ : Observable<number> = this.commentService.getCommentNumber();
  commentsNumber$ : Observable<number> = this.commentNumberSubject.asObservable();

  publicationNumberSubject = new BehaviorSubject<number>(0);
  //publicationsNumber$ : Observable<number> = this.publicationService.getPublicationNumber();
  publicationsNumber$ : Observable<number> = this.publicationNumberSubject.asObservable();


  lastComment$ : Observable<Comment> = this.commentService.getLastComment();
  lastPublication$ : Observable<Publication> = this.publicationService.getLastPublication();
  lastLike$ : Observable<Like> = this.likeService.getLastLike();

  ngOnInit() {
    this.publicationService.getPublications().subscribe((value : any) => this.publicationsSubject.next([...value]));
    this.commentService.getCommentsForAPublication().subscribe((value : any) => this.commentSubject.next([...value]));
    this.publicationService.getPublicationNumber().subscribe((value : any) => this.publicationNumberSubject.next(value));
    this.commentService.getCommentNumber().subscribe((value : any) => this.commentNumberSubject.next(value));
  }

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
      this.publicationService.publish(payload).pipe(tap((response: ApiResponse) => {
        const currentPublications = this.publicationsSubject.value;
        this.publicationsSubject.next([response.data, ...currentPublications]);
        this.publicationService.getPublicationNumber().subscribe((value : any) => this.publicationNumberSubject.next(value));
      })).subscribe();
    } else {
      if (payload.content.length == 0) {
        alert('Publication vide');
      }
    }
  }

  comment(publication : Publication){
    const payload : CommentPayload = {content : this.formGroupComment.value.myComment, publication : publication}
    if(this.formGroupComment.valid){
      this.commentService.comment(payload).pipe(tap((response: ApiResponse) => {
        const currentComments = this.commentSubject.value;
        this.commentSubject.next([response.data, ...currentComments]);
        this.commentService.getCommentNumber().subscribe((value : any) => this.commentNumberSubject.next(value));
      })).subscribe();
    } else {
      if (payload.content.length == 0) {
        alert('Commentaire vide');
      }
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
    this.publicationService.delete(publication.publication_id).pipe(tap((response: ApiResponse) => {
      const currentPublications = this.publicationsSubject.value;
      this.publicationsSubject.next(this.publicationService.getPublications().subscribe((value : any) => this.publicationsSubject.next([...value])));
      this.publicationService.getPublicationNumber().subscribe((value : any) => this.publicationNumberSubject.next(value));
      this.commentService.getCommentNumber().subscribe((value : any) => this.commentNumberSubject.next(value));
    })).subscribe();
  }

  getNumberLikesPublication(publication: Publication) : number {
    //this.likeService.listLike().subscribe((value: Like[]) => console.log(value))
    return 0;
  }

  getNumberLikesComment(comment: Comment) : number {
    return 0;
  }

  MyProfile() {
    this.dashboardService.myProfile()
  }

  LogOut(){
    this.authService.logOut();
  }

}
