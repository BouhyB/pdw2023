import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Profile} from '../../profile';
import {Repository} from 'typeorm';
import {Like} from '../model';

@Injectable()
export class LikeService{

    constructor(@InjectRepository(Like) private readonly repository: Repository<Like>) {
    }

    async getLikes(idProfile: string, idPublication: string) {
        return undefined;
    }
}