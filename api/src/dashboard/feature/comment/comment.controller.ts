import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {DashboardService} from '../../service/dashboard.service';
import {ProfileService} from '../profile';
import {Publication, PublicationService} from '../publication';
import {CommentService} from './service';
import {Comment} from './model';
import {CommentCreatePayload, CommentUpdatePayload} from './model/payload';
import {Credential} from '../../../security/model';
import {User} from '@common/config';

@ApiBearerAuth('access-token')
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
    constructor(private readonly service : CommentService) {
    }
    @Post('comment')
    create(@Body() payload: CommentCreatePayload, @User() user: Credential): Promise<Comment> {
        return this.service.create(payload, user);
    }
    @Delete('delete/:id')
    delete(@Param('id') id: string): Promise<void> {
        return this.service.delete(id);
    }
    @Get('detail/:id')
    detail(@Param('id') id: string): Promise<Comment> {
        return this.service.detail(id);
    }
    @Get('list')
    getAll(): Promise<Comment[]> {
        return this.service.getAllCommentsForAPublication();
    }
    @Put('update')
    update(@Body() payload: CommentUpdatePayload): Promise<Comment> {
        return this.service.update(payload);
    }
    @Get('user-comments')
    public getUserComments(@User() user: Credential){
        return this.service.getUserComments(user);
    }

    @Get('last-comment')
    public getDateLastComment(){
        return this.service.getDateLastComment();
    }

}