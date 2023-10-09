import {ApiProperty} from '@nestjs/swagger';
export class SignupPayload {
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
    @ApiProperty()
    mail: string
}
