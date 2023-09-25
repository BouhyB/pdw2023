import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiCodeResponse, ApiResponse} from '@common/api';
import {TestException} from './app.exception';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {AppControllerHelloWorld} from './app.swagger';

@ApiTags('Route de base')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiOperation(AppControllerHelloWorld)
  @Get()
  getHello(): void {
    throw new TestException();
  }
}
