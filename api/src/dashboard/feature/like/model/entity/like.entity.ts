import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';
import {ulid} from 'ulid';
import {Credential} from '../../../../../security/model';
import {Publication} from '../../../publication/model/entity/publication.entity';
import {Comment} from '../../../comment/model/entity/comment.entity';

@Entity()
export class Like{
    @PrimaryColumn('varchar', { length:26, default: () => `'${ulid()}'` })
    like_id : string;

    @Column({nullable: false, unique: false})
    date_like : Date;

    @OneToOne(()=>Credential, {eager:true})
    @JoinColumn({name : 'credential_id'})
    credential: Credential

    @OneToOne(()=>Publication, {eager:true})
    @JoinColumn({name : 'publication_id'})
    publication : Publication

    @OneToOne(()=>Comment, {eager:true})
    @JoinColumn({name : 'comment_id'})
    comment : Comment
}