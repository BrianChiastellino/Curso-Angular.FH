import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

// Configuracion de idioma de la APP

import localeEsHn from '@angular/common/locales/es-HN'      //Bajamos el idioma 
import localeFrCa from '@angular/common/locales/fr-CA'
import { registerLocaleData } from '@angular/common'
registerLocaleData(localeEsHn);                             //Registramos el idioma
registerLocaleData(localeFrCa);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-HN' }, //Inyectamos el idioma diciendo que va  a ser local para la app
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
