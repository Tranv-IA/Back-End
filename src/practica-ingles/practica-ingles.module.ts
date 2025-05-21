import { Module } from "@nestjs/common";
import { PracticaInglesService } from "./practicI-igles.service";
import { PracticaInglesController } from "./practica-ingles.controller";
import { IaIntegrationService } from "src/articulo/ia-integration.service";
import { UsuarioModule } from "src/usuario/usuario.module";

@Module({
    imports: [UsuarioModule],
    controllers:[PracticaInglesController],
    providers:[PracticaInglesService,IaIntegrationService],
    exports:[PracticaInglesService]
})
export class PracticaInglesModule{};