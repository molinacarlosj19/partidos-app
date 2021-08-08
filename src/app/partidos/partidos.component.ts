import { Component, OnInit } from '@angular/core';
import { Partido } from './partido';
import { PartidoService } from './partido.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html'
})
export class PartidosComponent implements OnInit {

  partidos: Partido[];

  constructor(private partidoService: PartidoService) { }

  ngOnInit() {
    this.partidoService.getPartidos().pipe(
      tap(partidos => {
        console.log('PartidosComponent: tap 3');
        partidos.forEach(partido => {
          console.log(partido.local);
        });
      })
    ).subscribe(partidos => this.partidos = partidos);
  }

  delete(partido: Partido): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al partido ${partido.local} VS ${partido.visitante}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.partidoService.delete(partido.id).subscribe(
          () => {
            this.partidos = this.partidos.filter(cli => cli !== partido)
            swal(
              'Partido Eliminado!',
              `Partido ${partido.local} VS ${json.partido.visitante} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }

}
