import {Injectable} from '@nestjs/common';
import {ProfileService} from '../feature/profile';
import {LikeService} from '../feature/like';
import {CommentService} from '../feature/comment';
import {PublicationService} from '../feature/publication';
import {IntegerType} from 'typeorm';

@Injectable()
export class DashboardService {
    constructor(
        private readonly profileService : ProfileService,
        private readonly likeService : LikeService,
        private readonly commentService : CommentService,
        private readonly publicationService : PublicationService,
    ) {
    }



    /*async getCommentsForAPublication(idProfile: string, idPublication: string) : Promise<Comment[]>{
        return await this.commentService.getComments(idProfile, idPublication);
    }
    async getLikeForAPublication(idProfile: string, idPublication: string) : Promise<IntegerType>{
        return await this.likeService.getLikes(idProfile, idPublication);
    }
    async getLikeForAComment(idProfile: string, idComment: string) : Promise<IntegerType>{
        return await this.likeService.getLikes(idProfile, idComment);
    }*/

}