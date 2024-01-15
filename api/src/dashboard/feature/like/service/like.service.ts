import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Profile} from '../../profile';
import {Repository} from 'typeorm';
import {Like, LikePayload} from '../model';
import {Publication, PublicationCreatePayload, PublicationUpdatePayload} from '../../publication';
import {Builder} from 'builder-pattern';
import {isNil} from 'lodash';

@Injectable()
export class LikeService{

    constructor(@InjectRepository(Like) private readonly repository: Repository<Like>) {
    }

    async create(payload: LikePayload): Promise<Like> {
        try {
            return await this.repository.save(Builder<Like>()

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
    async getAll(): Promise<[Like[], number]> {
        try {
            return await this.repository.findAndCountBy({});
        } catch (e) {
            //throw new ProfileListException();
        }
    }
}