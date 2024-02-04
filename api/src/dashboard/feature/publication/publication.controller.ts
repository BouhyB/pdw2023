import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {PublicationService} from './service';
import {Publication, PublicationCreatePayload, PublicationUpdatePayload} from './model';
import {User} from '@common/config';
import {Credential} from '../../../security/model';

@ApiBearerAuth('access-token')
@ApiTags('Publication')
@Controller('publication')
export class PublicationController {
    constructor(private readonly service : PublicationService) {
    }

    @Post('publish')
    public publish(@User()user: Credential, @Body() payload : PublicationCreatePayload){
        return this.service.create(payload, user);
    }
    @Delete('delete/:id')
    delete(@Param('id') id: string): Promise<void> {
        return this.service.delete(id);
    }
    @Get('detail/:id')
    detail(@Param('id') id: string): Promise<Publication> {
        return this.service.detail(id);
    }
    @Get('list')
    getAll(): Promise<Publication[]> {
        return this.service.getAll();
    }
    @Put('update')
    update(@Body() payload: PublicationUpdatePayload): Promise<Publication> {
        return this.service.update(payload);
    }

    @Get('user-publications')
    public getUserPublication(@User() user: Credential){
        return this.service.getUserPublications(user);
    }

    @Get('last-publication')
    public getLastPublication(){
        return this.service.getDateLastPublication();
    }

}