import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ulid} from 'ulid';
import {Exclude} from 'class-transformer';
@Entity()
export class Credential {
    @PrimaryColumn('varchar', { length:26, default: () => `'${ulid()}'` })
    credential_id: string;
    @Column({nullable: false, unique: true})
    username: string;
    @Exclude({ toPlainOnly: true })
    @Column({nullable: true})
    password: string;
    @Column({nullable: false, unique: true})
    mail: string;
    @Column({default:false})
    isAdmin:boolean;
    @Column({default: true})
    active: boolean;
    @CreateDateColumn()
    created: Date;
    @UpdateDateColumn()
    updated: Date;
}
