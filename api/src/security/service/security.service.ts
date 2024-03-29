import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {TokenService} from '../jwt/token.service';
import {isNil} from 'lodash';
import {
    CredentialDeleteException,
    SignupException,
    UserAlreadyExistException,
    UserNotFoundException
} from '../security.exception';
import {Credential, RefreshTokenPayload, SignInPayload, SignupPayload, Token} from '../model';
import {comparePassword, encryptPassword} from '../utils';
import {Builder} from 'builder-pattern';
import {Profile, ProfileCreatePayload, ProfileService} from '../../dashboard/feature/profile';

@Injectable()
export class SecurityService {
    constructor(@InjectRepository(Credential) private readonly repository: Repository<Credential>,
                private readonly profileService : ProfileService,
                private readonly tokenService: TokenService) {
    }

    async detail(id: string): Promise<Credential> {
        const result = await this.repository.findOneBy({credential_id: id});
        if (!(isNil(result))) {
            return result;
        }
        throw new UserNotFoundException();
    }

    async signIn(payload: SignInPayload,isAdmin:boolean): Promise<Token | null> {
        let result = await this.repository.findOneBy({username: payload.username,
            isAdmin:isAdmin});
        if (!isNil(result) && await comparePassword(payload.password, result.password)) {
            return this.tokenService.getTokens(result);
        }
        throw new UserNotFoundException();
    }

    async signup(payload: SignupPayload): Promise<Credential | null> {
        const result: Credential | null = await this.repository.findOneBy({username:
            payload.username});

        if (!isNil(result)) {
            throw new UserAlreadyExistException();
        }
        try {
            const encryptedPassword = await encryptPassword(payload.password) ;
            const newCredential = await this.repository.save(Builder<Credential>()
                .username(payload.username)
                .password(encryptedPassword)
                .mail(payload.mail)
                .build());

            await this.CreateProfile(payload);
            //await this.signIn(payload, false);
            return newCredential;
        } catch (e) {
            throw new SignupException();
        }
    }

    async CreateProfile(payload: SignupPayload) : Promise<Profile | null>{
        let user = await this.repository.findOneBy({username:
            payload.username});
        let payloadProfile : ProfileCreatePayload = new ProfileCreatePayload();
        payloadProfile.mail = user.mail;
        payloadProfile.picture = "image0";
        return this.profileService.create(payloadProfile, user);
    }

    async refresh(payload: RefreshTokenPayload): Promise<Token | null> {
        return this.tokenService.refresh(payload);
    }
    async delete(id): Promise<void> {
        try {
            const detail = await this.detail(id);
            await this.tokenService.deleteFor(detail);
            await this.repository.remove(detail);
        } catch (e) {
            throw new CredentialDeleteException();
        }
    }
}
