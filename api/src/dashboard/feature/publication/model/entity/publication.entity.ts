import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';
import {ulid} from 'ulid';
import {Credential} from '../../../../../security/model';
import {TypePublicationEnum} from '../enum/type-publication.enum';

@Entity()
export class Publication{
    @PrimaryColumn('varchar', { length:26, default: () => `'${ulid()}'` })
    publication_id : string;

    @Column({nullable: false, unique: false})
    date_publication : Date;

    @Column({nullable: false, unique: false})
    content : string;
    @Column({nullable: false, unique: false})
    type : TypePublicationEnum;
    @OneToOne(()=>Credential, {eager:true})
    @JoinColumn({name : 'credential_id'})
    credential: Credential

}