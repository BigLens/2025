import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Contact } from "./contact.entity";
import { Tasks } from "./task.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, (user) => user.reports, {onDelete: 'SET NULL'})
    manager: User

    @OneToMany(() => User, (user) => user.manager)
    reports: User[]

    @OneToOne(() => Contact, (contact) => contact.user)
    contact: Contact

    @OneToMany(() => Tasks, (task) => task.user)
    task: Tasks[]

    @ManyToMany(() => Tasks, (task) => task.users)
    @JoinTable()
    tasks: Tasks[]
}