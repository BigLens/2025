import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    phone: number;

    @Column()
    email: string;

    @OneToOne(() => User, user => user.contact, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User
}