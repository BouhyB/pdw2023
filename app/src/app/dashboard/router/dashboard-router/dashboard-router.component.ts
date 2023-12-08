import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-dashboard-router',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './dashboard-router.component.html',
  styleUrls: ['./dashboard-router.component.scss']
})
export class DashboardRouterComponent {

}
