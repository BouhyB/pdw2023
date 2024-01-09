import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';
import {ulid} from 'ulid';
import {Credential} from '../../../../../security/model';

@Entity()
export class Profile {
    @PrimaryColumn('varchar', { length:26, default: () => `'${ulid()}'` })
    profile_id : string;
    @Column({nullable: false, unique: false})
    picture : string;
    @Column({nullable: false, unique: false})
    description : string;
    @Column({nullable: false, unique: false})
    status : string;
    @Column({nullable: false, unique: false})
    lastname : string;
    @Column({nullable: false, unique: false})
    firstname : string;
    @Column({nullable: false, unique: true})
    mail : string;
    @OneToOne(()=>Credential, {eager:true})
    @JoinColumn({name : 'credential_id'})
    credential: Credential
}