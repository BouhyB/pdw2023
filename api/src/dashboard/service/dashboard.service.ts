import {Injectable} from '@nestjs/common';
import {Profile} from '../feature/profile/model';
import {ProfileService} from '../feature/profile/service';
import {Publication} from '../feature/publication/model/entity/publication.entity';
import {Comment} from '../feature/comment/model/entity/comment.entity';
import {Like} from '../feature/like/model/entity/like.entity';
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

    async detail(id: string): Promise<Profile> {
        return await this.profileService.detail(id);
    }

    async getPublications(id: string) : Promise<Publication[]>{
        return await this.publicationService.getPublications(id);
    }

    async getCommentsForAPublication(idProfile: string, idPublication: string) : Promise<Comment[]>{
        return await this.commentService.getComments(idProfile, idPublication);
    }
    async getLikeForAPublication(idProfile: string, idPublication: string) : Promise<IntegerType>{
        return await this.likeService.getLikes(idProfile, idPublication);
    }
    async getLikeForAComment(idProfile: string, idComment: string) : Promise<IntegerType>{
        return await this.likeService.getLikes(idProfile, idComment);
    }

}