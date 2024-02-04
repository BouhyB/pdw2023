import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Profile} from '../../profile';
import {Repository} from 'typeorm';
import {Like, LikePayload} from '../model';
import {Publication, PublicationCreatePayload, PublicationUpdatePayload} from '../../publication';
import {Builder} from 'builder-pattern';
import {isNil} from 'lodash';
import {Credential} from '../../../../security/model';
import {ulid} from 'ulid';

@Injectable()
export class LikeService{

    constructor(@InjectRepository(Like) private readonly repository: Repository<Like>) {
    }

    async create(payload: LikePayload, user : Credential): Promise<Like> {
        try {
            return await this.repository.save(Builder<Like>()
                .like_id(ulid())
                .credential(user)
                .publication(payload.publication)
                .comment(payload.comment)
                .build()
            );
        } catch (e) {
            //throw new PublicationCreateException();
        }
    }
    async delete(id: string): Promise<void> {
        try {
            const detail = await this.detail(id);
            await this.repository.remove(detail);
        } catch (e) {
            //throw new PublicationDeleteException();
        }
    }
    async detail(id: string): Promise<Like> {
        const result = await this.repository.findOneBy({like_id: id});
        if (!(isNil(result))) {
            return result;
        }
        //throw new PublicationNotFoundException();
    }
    async getAll(): Promise<Like[]> {
        try {
            return await this.repository.find();
        } catch (e) {
            //throw new ProfileListException();
        }
    }

    async getDateLastLike() : Promise <Like>{
        try {
            return  this.repository.createQueryBuilder("like")
                .orderBy("like.created", "DESC")
                .getOne();
        } catch (e) {
            //throw new ProfileListException();
        }
    }


}