import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {configManager} from '@common/config/';
import {TypeOrmModule} from '@nestjs/typeorm';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [TypeOrmModule.forRoot(configManager.getTypeOrmConfig()), SecurityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
