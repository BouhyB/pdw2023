import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
export class SignupPayload {
    @ApiProperty()
    @IsNotEmpty()
    username: string

    @ApiProperty()
    @IsNotEmpty()
    password: string

    @ApiProperty()
    @IsNotEmpty()
    passwordVerify: string

    @ApiProperty()
    @IsNotEmpty()
    mail: string
}
