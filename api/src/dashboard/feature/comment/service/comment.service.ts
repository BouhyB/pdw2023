import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Profile} from '../../profile';
import {Repository} from 'typeorm';
import {Comment} from '../model';
import {Publication, PublicationCreatePayload, PublicationUpdatePayload} from '../../publication';
import {Builder} from 'builder-pattern';
import {isNil} from 'lodash';
import {CommentCreatePayload, CommentUpdatePayload} from '../payload';
import {
    CommentCreateException,
    CommentDeleteException,
    CommentListException,
    CommentNotFoundException, CommentUpdateException
} from '../../../dashboard.exception';
import {Credential} from '../../../../security/model';

@Injectable()
export class CommentService{
    constructor(@InjectRepository(Comment) private readonly repository: Repository<Comment>) {
    }

    async create(payload: CommentCreatePayload, user: Credential): Promise<Comment> {
        try {
            return await this.repository.save(Builder<Comment>()
                .content(payload.content)
                .credential(user)
                .publication(payload.publication)
                .build()
            );
        } catch (e) {
            throw new CommentCreateException();
        }
    }
    async delete(id: string): Promise<void> {
        try {
            const detail = await this.detail(id);
            await this.repository.remove(detail);
        } catch (e) {
            throw new CommentDeleteException();
        }
    }
    async detail(id: string): Promise<Comment> {
        const result = await this.repository.findOneBy({comment_id: id});
        if (!(isNil(result))) {
            return result;
        }
        throw new CommentNotFoundException();
    }
    async getAllCommentsForAPublication(): Promise<Comment[]> {
        try {
            return await this.repository.find();
        } catch (e) {
            throw new CommentListException();
        }
    }
    async update(payload: CommentUpdatePayload): Promise<Comment> {
        try {
            let detail = await this.detail(payload.comment_id);
            detail.comment_id = payload.comment_id
            detail.content = payload.content
            //detail.publication_id = payload.publication_id
            return await this.repository.save(detail);
        } catch (e) {
            throw new CommentUpdateException();
        }
    }
}