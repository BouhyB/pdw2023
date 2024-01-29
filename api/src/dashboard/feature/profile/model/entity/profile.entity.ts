import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';
import {ulid} from 'ulid';
import {Credential} from '../../../../../security/model';
import {BaseEntity} from '@common/entity/base.entity';

@Entity()
export class Profile extends BaseEntity{
    @PrimaryColumn('varchar', { length:26, default: () => `'${ulid()}'` })
    profile_id : string;
    @Column({nullable: true, unique: false})
    picture : string;
    @Column({nullable: true, unique: false})
    description : string;
    @Column({nullable: true, unique: false})
    status : string;
    @Column({nullable: true, unique: false})
    lastname : string;
    @Column({nullable: true, unique: false})
    firstname : string;
    @Column({nullable: true, unique: true})
    mail : string;
    @OneToOne(()=>Credential, {eager:true})
    @JoinColumn({name : 'credential_id'})
    credential: Credential
}