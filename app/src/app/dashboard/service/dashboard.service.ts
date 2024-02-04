import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService, AppNode} from '@shared';
import {PublicationService} from '../feature/publication/service/publication.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly router: Router = inject(Router);

  home():void{
    this.router.navigate([AppNode.AUTHENTICATED]).then()
  }

  myProfile():void{
    this.router.navigate([AppNode.DETAIL]).then()
  }
}
