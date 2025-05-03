import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articulo } from 'src/articulo/entities/articulo.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432', 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [
                Usuario,
                Articulo
            ],
            ssl: {
                rejectUnauthorized: false, // esto evita errores de certificado autofirmado
            },
            synchronize: true,
            autoLoadEntities: true,
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
