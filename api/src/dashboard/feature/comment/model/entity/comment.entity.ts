import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {ulid} from 'ulid';
import {Credential} from '../../../../../security/model';
import {Publication} from '../../../publication';
import {BaseEntity} from '@common/entity/base.entity';

@Entity()
export class Comment extends BaseEntity {
    @PrimaryColumn('varchar', { length:26, default: () => `'${ulid()}'` })
    comment_id : string;

    @Column({nullable: false, unique: false})
    content : string;

    @ManyToOne(()=>Credential, {eager:true})
    @JoinColumn({name : 'credential_id'})
    credential: Credential

    @ManyToOne(()=>Publication, {eager:true, onDelete:'CASCADE'})
    @JoinColumn({name : 'publication_id'})
    publication : Publication

}