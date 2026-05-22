import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importamos ChangeDetectorRef
import { MetaServiceService } from '../services/meta-service';
import { Meta } from '../models/meta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: false
})
export class HomeComponent implements OnInit {
  listaMetas: Meta[] = [];
  nuevaMetaTexto: string = '';

  // 2. Inyectamos cdr en el constructor junto a tu servicio
  constructor(
    private metaService: MetaServiceService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.metaService.getMetas().subscribe(data => {
      this.listaMetas = data;
      // 3. Forzamos a Angular a redibujar la pantalla inmediatamente cuando Firebase responda
      this.cdr.detectChanges(); 
    });
  }

  guardarMeta() {
    if (this.nuevaMetaTexto.trim() === '') return;

    const metaObjeto: Meta = {
      meta: this.nuevaMetaTexto
    };

    this.metaService.addMeta(metaObjeto).then(() => {
      this.nuevaMetaTexto = '';
      this.cdr.detectChanges(); // Refrescamos tras limpiar el input
    }).catch(err => console.error('Error al guardar meta: ', err));
  }

  eliminarMeta(id: string | undefined) {
    if (id) {
      this.metaService.deleteMeta(id).then(() => {
        this.cdr.detectChanges(); // Refrescamos tras confirmar la eliminación
      }).catch(err => console.error('Error al eliminar: ', err));
    }
  }
}
