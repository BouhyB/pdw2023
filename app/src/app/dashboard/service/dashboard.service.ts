import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService, AppNode} from '@shared';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly api: ApiService = inject(ApiService);
  private readonly router: Router = inject(Router);

  home():void{
    this.router.navigate([AppNode.AUTHENTICATED]).then()
  }

  myProfile():void{
    this.router.navigate([AppNode.DETAIL]).then()
  }
}
