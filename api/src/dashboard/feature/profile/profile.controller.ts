import {Profile, ProfileCreatePayload, ProfileUpdatePayload} from './model';
import {ProfileService} from './service';
import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Credential} from '../../../security/model';
import {User} from '@common/config';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';

@ApiBearerAuth('access-token')
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
    constructor(private readonly service: ProfileService) {
    }
    @Post('create')
    create(@Body() payload: ProfileCreatePayload, @User() user: Credential): Promise<Profile> {
        return this.service.create(payload, user);
    }
    /*@Delete('delete/:id')
    delete(@Param('id') id: string): Promise<void> {
        return this.service.delete(id);
    }
    /*@Get('detail/:id')
    detail(@Param('id') id: string): Promise<Profile> {
        return this.service.detail(id);
    }*/
    @Get('detail')
    detail(@User() user : Credential): Promise<Profile> {
        return this.service.detail(user);
    }
    @Get('list')
    getAll(): Promise<Profile[]> {
        return this.service.getAll();
    }
    @Put('update')

    update(@Body() payload: ProfileUpdatePayload, @User() user: Credential): Promise<Profile> {
        return this.service.update(payload, user);
    }
    /*@Put('update')
    @UseInterceptors(FileInterceptor('file', {
        storage : diskStorage({
            destination: "./uploads",
            filename: (req, file, cb) =>{
                const name = file.originalname.split(".")[0];
                const fileExtension = file.originalname.split(".")[1];
                const newFileName = name.split(" ").join("_") + "_" + Date.now() + "." + fileExtension;

                cb(null, newFileName);
            }
        }),
        fileFilter: (req, file, cb) =>{
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
                return cb(null, false);
            }
            cb(null, true);
        }
    }))
    update(@Body() payload: ProfileUpdatePayload, @User() user: Credential, @UploadedFile() file : Express.Multer.File): Promise<Profile> {
        return this.service.update(payload, user, file.filename);
    }*/
}