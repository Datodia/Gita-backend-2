import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    fullName: string

    @Column({unique: true})
    email: string

    @OneToMany(()=> Post, (post)=> post.author)
    posts: Post[]

}
