import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Publication, PublicationCreatePayload, PublicationUpdatePayload} from '../model';
import {Builder} from 'builder-pattern';
import {isNil} from 'lodash';
import {
    PublicationCreateException, PublicationDeleteException,
    PublicationListException, PublicationNotFoundException,
    PublicationUpdateException, PublicationUserCountException
} from '../../../dashboard.exception';
import {Credential} from '../../../../security/model';
import {ulid} from 'ulid';
import {Comment} from '../../comment';

@Injectable()
export class PublicationService{

    constructor(@InjectRepository(Publication) private readonly repository: Repository<Publication>) {
    }

    async create(payload: PublicationCreatePayload, user: Credential): Promise<Publication> {
        try {
            return await this.repository.save(Builder<Publication>()
                .publication_id(ulid())
                .content(payload.content)
                .type(payload.type)
                .credential(user)
                .build()
            );
        } catch (e) {
            console.log(e);
            throw new PublicationCreateException();
        }
    }
    async delete(id: string): Promise<void> {
        try {
            const detail = await this.detail(id);
            await this.repository.remove(detail);
        } catch (e) {
            throw new PublicationDeleteException();
        }
    }
    async detail(id: string): Promise<Publication> {
        const result = await this.repository.findOneBy({publication_id: id});
        if (!(isNil(result))) {
            return result;
        }
        throw new PublicationNotFoundException();
    }
    async getAll(): Promise<Publication[]> {
        try {
            return this.repository.createQueryBuilder("publication")
                .orderBy("publication.created", "DESC")
                .getMany()
        } catch (e) {
            throw new PublicationListException();
        }
    }
    async update(payload: PublicationUpdatePayload): Promise<Publication> {
        try {
            let detail = await this.detail(payload.publication_id);
            detail.publication_id = payload.publication_id
            detail.content = payload.content
            detail.type = payload.type
            return await this.repository.save(detail);
        } catch (e) {
            throw new PublicationUpdateException();
        }
    }

    async getUserPublications(user: Credential) : Promise<number>{
        try {
            return this.repository.createQueryBuilder("publication")
                .where("publication.credential_id = :id", {id : user.credential_id})
                .getCount()
        } catch (e) {
            throw new PublicationUserCountException();
        }
    }

    async getDateLastPublication() : Promise <Publication>{
        try {
            return  this.repository.createQueryBuilder("publication")
                .orderBy("publication.created", "DESC")
                .getOne();
        } catch (e) {
            //throw new ProfileListException();
        }
    }
}