import {Profile, ProfileCreatePayload, ProfileUpdatePayload} from './model';
import {ProfileService} from './service';
import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Credential} from '../../../security/model';
import {User} from '@common/config';

@ApiBearerAuth('access-token')
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
    constructor(private readonly service: ProfileService) {
    }
    @Post('create')
    create(@Body() payload: ProfileCreatePayload, @User() user: Credential): Promise<Profile> {
        return this.service.create(payload, user);
    }
    @Delete('delete/:id')
    delete(@User() user : Credential): Promise<void> {
        return this.service.delete(user);
    }
    @Get('detail/:id')
    detail(@User() user : Credential): Promise<Profile> {
        return this.service.detail(user);
    }
    @Get('list')
    getAll(): Promise<Profile[]> {
        return this.service.getAll();
    }
    @Put('update')
    update(@Body() payload: ProfileUpdatePayload, @User() user: Credential): Promise<Profile> {
        return this.service.update(payload, user);
    }
}