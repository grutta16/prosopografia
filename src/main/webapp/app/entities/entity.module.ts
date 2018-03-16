import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProsopografiaPaisPrModule } from './pais-pr/pais-pr.module';
import { ProsopografiaProvinciaPrModule } from './provincia-pr/provincia-pr.module';
import { ProsopografiaTipoProfesionPrModule } from './tipo-profesion-pr/tipo-profesion-pr.module';
import { ProsopografiaLugarPrModule } from './lugar-pr/lugar-pr.module';
import { ProsopografiaProfesionPrModule } from './profesion-pr/profesion-pr.module';
import { ProsopografiaReligionPrModule } from './religion-pr/religion-pr.module';
import { ProsopografiaAsociacionPrModule } from './asociacion-pr/asociacion-pr.module';
import { ProsopografiaPartidoPrModule } from './partido-pr/partido-pr.module';
import { ProsopografiaCargoPrModule } from './cargo-pr/cargo-pr.module';
import { ProsopografiaSeccionPrModule } from './seccion-pr/seccion-pr.module';
import { ProsopografiaEleccionPrModule } from './eleccion-pr/eleccion-pr.module';
import { ProsopografiaCandidaturaPrModule } from './candidatura-pr/candidatura-pr.module';
import { ProsopografiaDetCandidaturaPrModule } from './det-candidatura-pr/det-candidatura-pr.module';
import { ProsopografiaPersonaPrModule } from './persona-pr/persona-pr.module';
import { ProsopografiaFamiliarPersonajePrModule } from './familiar-personaje-pr/familiar-personaje-pr.module';
import { ProsopografiaRelacionFamiliarPrModule } from './relacion-familiar-pr/relacion-familiar-pr.module';
import { ProsopografiaParejaPersonajePrModule } from './pareja-personaje-pr/pareja-personaje-pr.module';
import { ProsopografiaPersonajePrModule } from './personaje-pr/personaje-pr.module';
import { ProsopografiaAsociacionPersonajePrModule } from './asociacion-personaje-pr/asociacion-personaje-pr.module';
import { ProsopografiaPartidoPersonajePrModule } from './partido-personaje-pr/partido-personaje-pr.module';
import { ProsopografiaReligionPersonajePrModule } from './religion-personaje-pr/religion-personaje-pr.module';
import { ProsopografiaResidenciaPersonajePrModule } from './residencia-personaje-pr/residencia-personaje-pr.module';
import { ProsopografiaCargoPersonajePrModule } from './cargo-personaje-pr/cargo-personaje-pr.module';
import { ProsopografiaInstitucionPrModule } from './institucion-pr/institucion-pr.module';
import { ProsopografiaCarreraPrModule } from './carrera-pr/carrera-pr.module';
import { ProsopografiaEstudioPersonajePrModule } from './estudio-personaje-pr/estudio-personaje-pr.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ProsopografiaPaisPrModule,
        ProsopografiaProvinciaPrModule,
        ProsopografiaTipoProfesionPrModule,
        ProsopografiaLugarPrModule,
        ProsopografiaProfesionPrModule,
        ProsopografiaReligionPrModule,
        ProsopografiaAsociacionPrModule,
        ProsopografiaPartidoPrModule,
        ProsopografiaCargoPrModule,
        ProsopografiaSeccionPrModule,
        ProsopografiaEleccionPrModule,
        ProsopografiaCandidaturaPrModule,
        ProsopografiaDetCandidaturaPrModule,
        ProsopografiaPersonaPrModule,
        ProsopografiaFamiliarPersonajePrModule,
        ProsopografiaRelacionFamiliarPrModule,
        ProsopografiaParejaPersonajePrModule,
        ProsopografiaPersonajePrModule,
        ProsopografiaAsociacionPersonajePrModule,
        ProsopografiaPartidoPersonajePrModule,
        ProsopografiaReligionPersonajePrModule,
        ProsopografiaResidenciaPersonajePrModule,
        ProsopografiaCargoPersonajePrModule,
        ProsopografiaInstitucionPrModule,
        ProsopografiaCarreraPrModule,
        ProsopografiaEstudioPersonajePrModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProsopografiaEntityModule {}
