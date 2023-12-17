import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {SignInPageComponent} from '@security';
import {ApiService} from '@api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SignInPageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  private readonly api: ApiService = inject(ApiService);
  /*ngOnInit(): void {
    this.api.get('').subscribe((data) => {
      console.log('my data', data);
    })
  }*/
}
