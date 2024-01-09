import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {configManager} from '@common/config/';
import {TypeOrmModule} from '@nestjs/typeorm';
import { SecurityModule } from './security/security.module';
import {APP_GUARD} from '@nestjs/core';
import {JwtGuard} from './security/jwt/jwt.guard';
import {DashboardModule} from './dashboard/dashboard.module';

@Module({
  imports: [TypeOrmModule.forRoot(configManager.getTypeOrmConfig()), SecurityModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD, useClass: JwtGuard}],
})
export class AppModule {}
