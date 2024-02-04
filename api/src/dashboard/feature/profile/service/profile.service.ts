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
import {Credential} from '../../../../security/model';
import {ulid} from 'ulid';

@Injectable()
export class ProfileService{
    constructor(@InjectRepository(Profile) private readonly repository: Repository<Profile>) {
    }
    async create(payload: ProfileCreatePayload, user: Credential): Promise<Profile> {
        try {
            return await this.repository.save(Builder<Profile>()
                .profile_id(ulid())
                .firstname(payload.firstname)
                .lastname(payload.lastname)
                .mail(payload.mail)
                .description(payload.description)
                .status(payload.status)
                .picture(payload.picture)
                .credential(user)
                .build()
            );
        } catch (e) {
            throw new ProfileCreateException();
        }
    }
    /*async delete(id: string): Promise<void> {
        try {
            const detail = await this.detail(id);
            await this.repository.remove(detail);
        } catch (e) {
            throw new ProfileDeleteException();
        }
    }
    /*async detail(id: string): Promise<Profile> {
        const result = await this.repository.findOneBy({profile_id : id});
        if (!(isNil(result))) {
            return result;
        }
        throw new ProfileNotFoundException();
    }*/
    async detail(user: Credential): Promise<Profile> {
        //const result = await this.repository.findOneBy({credential : user});
        const result = this.repository.createQueryBuilder("profile")
            .where("profile.credential_id = :id", {id : user.credential_id})
            .getOne()
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
    async update(payload: ProfileUpdatePayload, user: Credential): Promise<Profile> {
        try {
            let detail = await this.detail(user);
            detail.firstname = payload.firstname;
            detail.lastname = payload.lastname;
            detail.mail = payload.mail;
            detail.status = payload.status
            detail.description = payload.description
            detail.picture = payload.picture
            return await this.repository.save(detail);
        } catch (e) {
            throw new ProfileUpdateException();
        }
    }
    /*async update(payload: ProfileUpdatePayload, user: Credential, filename : string): Promise<Profile> {
        try {
            let detail = await this.detail(user);
            detail.firstname = payload.firstname;
            detail.lastname = payload.lastname;
            detail.mail = payload.mail;
            detail.status = payload.status
            detail.description = payload.description
            detail.picture = filename
            return await this.repository.save(detail);
        } catch (e) {
            throw new ProfileUpdateException();
        }
    }*/
}