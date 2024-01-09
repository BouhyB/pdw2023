import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardService} from '../../../service/dashboard.service';

@Component({
  selector: 'app-dashboard-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-home-page.component.html',
  styleUrls: ['./dashboard-home-page.component.scss']
})
export class DashboardHomePageComponent {
  private readonly dashboardService: DashboardService = inject(DashboardService)

  Home() {
    this.dashboardService.home()
  }

  MyProfile() {
    this.dashboardService.myProfile()
  }
}
