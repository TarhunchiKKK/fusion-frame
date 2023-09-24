import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Path{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;
}