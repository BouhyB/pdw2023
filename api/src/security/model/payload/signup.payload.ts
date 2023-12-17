import {ApiProperty} from '@nestjs/swagger';
export class SignupPayload {
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
    @ApiProperty()
    passwordVerif: string
    @ApiProperty()
    mail: string
}
