import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigKey, configManager} from '@common/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Credential, Token} from '../security/model';
import {TokenService} from '../security/jwt/token.service';
import {Profile} from './feature/profile';
import {DashboardService} from './service/dashboard.service';
import {DashboardController} from './dashboard.controller';
import {ProfileService} from './feature/profile';
import {Publication, PublicationService} from './feature/publication';
import {Comment, CommentService} from './feature/comment';
import {Like, LikeService} from './feature/like';


@Module({
    imports: [JwtModule.register({
        global: true,
        secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
        signOptions: {expiresIn: configManager.getValue(ConfigKey.JWT_TOKEN_EXPIRE_IN)},
    }),TypeOrmModule.forFeature([Credential, Token, Profile, Publication, Like, Comment])],
    exports: [DashboardService],
    providers: [TokenService, DashboardService, ProfileService, PublicationService, CommentService, LikeService],
    controllers: [DashboardController]
})
export class DashboardModule {}