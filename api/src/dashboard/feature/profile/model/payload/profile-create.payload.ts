import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, Length} from 'class-validator';

export class ProfileCreatePayload {
    @ApiProperty()
    @IsOptional()
    picture : string;
    @ApiProperty()
    @IsOptional()
    @Length(1, 100)
    description : string;
    @ApiProperty()
    @IsOptional()
    status : string;
    @ApiProperty()
    @IsOptional()
    @Length(1, 50)
    lastname : string;
    @ApiProperty()
    @IsOptional()
    @Length(1, 50)
    firstname : string;
    @ApiProperty()
    @IsNotEmpty()
    @Length(1, 50)
    mail : string;
}