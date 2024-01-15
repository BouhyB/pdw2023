import { Module } from '@nestjs/common';
import {InjectRepository, TypeOrmModule} from '@nestjs/typeorm';
import { TokenService } from './jwt/token.service';
import { SecurityService } from './service';

import { SecurityController } from './security.controller';
import {Token, Credential} from './model';
import {JwtModule} from '@nestjs/jwt';
import {ConfigKey, configManager} from '@common/config';
import {Profile, ProfileService} from '../dashboard/feature/profile';

@Module({
    imports: [JwtModule.register({
        global: true,
        secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
        signOptions: {expiresIn: configManager.getValue(ConfigKey.JWT_TOKEN_EXPIRE_IN)},
    }),TypeOrmModule.forFeature([Credential, Token, Profile])],
    exports: [SecurityService],
    providers: [TokenService, SecurityService, ProfileService],
    controllers: [SecurityController]
})
export class SecurityModule {}
