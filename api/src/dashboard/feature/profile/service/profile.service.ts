import {Injectable} from '@nestjs/common';
import {isNil} from 'lodash';
import {UserNotFoundException} from '../../../../security/security.exception';
import {InjectRepository} from '@nestjs/typeorm';
import {Profile} from '../model';
import {Repository} from 'typeorm';

@Injectable()
export class ProfileService{
    constructor(@InjectRepository(Profile) private readonly repository: Repository<Profile>) {
    }
    async detail(id: string): Promise<Profile> {
        const result = await this.repository.findOneBy({profile_id: id});
        if (!(isNil(result))) {
            return result;
        }
        throw new UserNotFoundException();
    }
}