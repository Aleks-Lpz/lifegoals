import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Requerido para capturar los inputs de las metas
import { CommonModule } from '@angular/common'; // <-- 1. Agrega esta importación

// Módulos de Firebase para compatibilidad con el esquema clásico de módulos
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// Entorno y ruteo
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app';
import { HomeComponent } from './home/home';
import { AboutComponent } from './about/about';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, // <-- 2. Inyéctalo aquí para que funcionen *ngIf y *ngFor
    AppRoutingModule,
    FormsModule, // <-- Importante para usar [(ngModel)] en el input de texto 
    AngularFireModule.initializeApp(environment.firebase), // <-- Inicializa la app con las llaves [cite: 45, 46]
    AngularFirestoreModule // <-- Módulo de Firestore para inyectar en los servicios 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
