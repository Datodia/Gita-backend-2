import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    desc: string

    @Column()
    userId: string

    @ManyToOne(() => User, (user) => user.posts, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'userId'})
    author: User
}
