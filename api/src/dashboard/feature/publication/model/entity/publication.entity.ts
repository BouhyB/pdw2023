import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn} from 'typeorm';
import {ulid} from 'ulid';
import {Credential} from '../../../../../security/model';
import {TypePublicationEnum} from '../enum/type-publication.enum';
import {Exclude} from 'class-transformer';
import {BaseEntity} from '@common/entity/base.entity';

@Entity()
export class Publication extends BaseEntity{
    @PrimaryColumn('varchar', { length:26, default: () => `'${ulid()}'` })
    publication_id : string;

    @Column({nullable: false, unique: false})
    content : string;
    @Column({nullable: false, unique: false})
    type : TypePublicationEnum;
    @ManyToOne(()=>Credential, {eager:true})
    @JoinColumn({name : 'credential_id'})
    credential: Credential

}