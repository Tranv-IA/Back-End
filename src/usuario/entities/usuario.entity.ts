import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity("usuarios")
export class Usuario {
    @PrimaryColumn()
    uidFirebas:string;
    @Column()
    nombre:string;
    @Column()
    email:string;
}
