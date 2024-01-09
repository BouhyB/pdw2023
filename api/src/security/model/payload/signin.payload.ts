import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional} from 'class-validator';
export class SignInPayload {
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}