import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Profile} from '../../profile';
import {Repository} from 'typeorm';
import {Comment} from '../model';

@Injectable()
export class CommentService{
    constructor(@InjectRepository(Comment) private readonly repository: Repository<Comment>) {
    }

    async getComments(idProfile: string, idPublication: string) {
        return [];
    }
}