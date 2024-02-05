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

    @OneToOne(()=>Credential, {eager:true, nullable : false})
    @JoinColumn({name : 'credential_id'})
    credential: Credential

    @OneToOne(()=>Publication, {eager:true , nullable : true, onDelete:'CASCADE'})
    @JoinColumn({name : 'publication_id'})
    publication : Publication

    @OneToOne(()=>Comment, {eager:true, nullable : true, onDelete:'CASCADE'})
    @JoinColumn({name : 'comment_id'})
    comment : Comment
}