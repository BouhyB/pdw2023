import {Injectable} from '@nestjs/common';
import {Comment} from '../../comment';
import {InjectRepository} from '@nestjs/typeorm';
import {Profile} from '../../profile';
import {Repository} from 'typeorm';
import {Publication} from '../model';

@Injectable()
export class PublicationService{

    constructor(@InjectRepository(Publication) private readonly repository: Repository<Publication>) {
    }

    async getPublications(id: string) {
        return undefined;
    }
}