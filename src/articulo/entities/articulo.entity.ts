import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({name:"Articulos"})
export class Articulo {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column()
    content:string;
    @ManyToOne(()=>Usuario,(user)=>user.id)
    @JoinColumn({name:"id_usuario"})
    usuario:Usuario;
}
