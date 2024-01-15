import {Injectable} from '@nestjs/common';
import {isNil} from 'lodash';
import {UserNotFoundException} from '../../../../security/security.exception';
import {InjectRepository} from '@nestjs/typeorm';
import {Profile, ProfileCreatePayload, ProfileUpdatePayload} from '../model';
import {Repository} from 'typeorm';
import {Builder} from 'builder-pattern';
import {
    ProfileCreateException,
    ProfileDeleteException,
    ProfileListException,
    ProfileNotFoundException,
    ProfileUpdateException
} from '../../../dashboard.exception';

@Injectable()
export class ProfileService{
    constructor(@InjectRepository(Profile) private readonly repository: Repository<Profile>) {
    }
    async create(payload: ProfileCreatePayload): Promise<Profile> {
        try {
            return await this.repository.save(Builder<Profile>()
                .firstname(payload.firstname)
                .lastname(payload.lastname)
                .mail(payload.mail)
                .description(payload.description)
                .status(payload.status)
                .picture(payload.picture)
                .credential(payload.credential)
                .build()
            );
        } catch (e) {
            throw new ProfileCreateException();
        }
    }
    async delete(id: string): Promise<void> {
        try {
            const detail = await this.detail(id);
            await this.repository.remove(detail);
        } catch (e) {
            throw new ProfileDeleteException();
        }
    }
    async detail(id: string): Promise<Profile> {
        const result = await this.repository.findOneBy({profile_id: id});
        if (!(isNil(result))) {
            return result;
        }
        throw new ProfileNotFoundException();
    }
    async getAll(): Promise<Profile[]> {
        try {
            return await this.repository.find();
        } catch (e) {
            throw new ProfileListException();
        }
    }
    async update(payload: ProfileUpdatePayload): Promise<Profile> {
        try {
            let detail = await this.detail(payload.profile_id);
            detail.profile_id = payload.profile_id
            detail.firstname = payload.firstname;
            detail.lastname = payload.lastname;
            detail.mail = payload.mail;
            detail.status = payload.status
            detail.description = payload.description
            detail.picture = payload.picture
            detail.credential = payload.credential
            return await this.repository.save(detail);
        } catch (e) {
            throw new ProfileUpdateException();
        }
    }
}