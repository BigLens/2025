import { PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm";
import { User } from "./user.entity";

export class Tasks {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => User, (user) => user.task, {onDelete: 'SET NULL'})
    user: User

    @ManyToMany(() => User, (user) => user.tasks)
    users: User[];
}