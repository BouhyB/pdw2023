import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';
import {ulid} from 'ulid';
import {Credential} from '../../../../../security/model';
import {Publication} from '../../../publication';
import {Comment} from '../../../comment';
import {BaseEntity} from '@common/entity/base.entity';

@Entity()
export class Like extends BaseEntity{
    @PrimaryColumn('varchar', { length:26, default: () => `'${ulid()}'` })
    like_id : string;

    @OneToOne(()=>Credential, {eager:true})
    @JoinColumn({name : 'credential_id'})
    credential_id: string

    @OneToOne(()=>Publication, {eager:true})
    @JoinColumn({name : 'publication_id'})
    publication_id : string

    @OneToOne(()=>Comment, {eager:true})
    @JoinColumn({name : 'comment_id'})
    comment_id : string
}