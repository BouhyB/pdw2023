import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Controller, Get} from '@nestjs/common';
import {DashboardService} from './service/dashboard.service';
import {User} from '@common/config';
import {Profile} from './feature/profile/model';

@ApiBearerAuth('access-token')
@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly service : DashboardService) {
    }

    @Get('profile/detail/:id')
    public myProfile(@User() user: Profile) {
        return user;
    }
}