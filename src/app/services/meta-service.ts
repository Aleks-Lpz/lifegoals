import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Meta } from '../models/meta.model';

@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {
  private metasCollection: AngularFirestoreCollection<Meta>;
  metas: Observable<Meta[]>;

  constructor(private afs: AngularFirestore) {
    this.metasCollection = afs.collection<Meta>('metas');
    
    // idField: 'id' le mete automáticamente el ID de Firebase a tu objeto Meta
    this.metas = this.metasCollection.valueChanges({ idField: 'id' });
  }

  getMetas() {
    return this.metas;
  }

  addMeta(nuevaMeta: Meta) {
    return this.metasCollection.add({ meta: nuevaMeta.meta });
  }

  // Cambiamos el método para usar la referencia directa del cliente de Firebase 
  // evitando el error NG0203 de inyección de Angular
  deleteMeta(id: string) {
    return this.metasCollection.ref.doc(id).delete();
  }
}
