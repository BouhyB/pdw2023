import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Get, Post} from '@nestjs/common';
import {LikeService} from './service';
import {User} from '@common/config';
import {Credential} from '../../../security/model';
import {LikePayload} from './model';

@ApiBearerAuth('access-token')
@ApiTags('Like')
@Controller('like')
export class LikeController {
    constructor(private readonly service: LikeService) {
    }

    @Post('like')
    public like(@User()user: Credential, @Body() payload : LikePayload){
        return this.service.create(payload, user);
    }

    @Get('list')
    public getLikes(){
        return this.service.getAll();
    }
    @Get('last-like')
    public getLastPublication(){
        return this.service.getDateLastLike();
    }

}