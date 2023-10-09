import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Token, Credential} from './model';
import { TokenService } from './jwt/token.service';

@Module({
    imports: [TypeOrmModule.forFeature([Credential, Token])],
    providers: [TokenService]
})
export class SecurityModule {}
