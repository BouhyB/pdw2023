import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';
import {ulid} from 'ulid';
import {Credential} from '../../../../../security/model';
import {Publication} from '../../../publication/model/entity/publication.entity';

@Entity()
export class Comment{
    @PrimaryColumn('varchar', { length:26, default: () => `'${ulid()}'` })
    comment_id : string;

    @Column({nullable: false, unique: false})
    date_comment : Date;

    @Column({nullable: false, unique: false})
    content : string;

    @OneToOne(()=>Credential, {eager:true})
    @JoinColumn({name : 'credential_id'})
    credential: Credential

    @OneToOne(()=>Publication, {eager:true})
    @JoinColumn({name : 'publication_id'})
    publication : Publication

}