import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity("usuarios")
export class Usuario {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    uidFirebas:string;
    @Column()
    nombre:string;
    @Column()
    email:string;
}
