import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, Post} from '@nestjs/common';
import {DashboardService} from './service/dashboard.service';

@ApiBearerAuth('access-token')
@ApiTags('Dashboard')
@Controller()
export class DashboardController {
    constructor(private readonly dashboardService : DashboardService,) {
    }

}