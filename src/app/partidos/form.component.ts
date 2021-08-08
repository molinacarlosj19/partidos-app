import { Component, OnInit } from '@angular/core';
import { Partido } from './partido';
import { PartidoService } from './partido.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private partido: Partido = new Partido();
  titulo: string = "Crear Partido";

  errores: string[];

  constructor(private partidoService: PartidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarPartido();
  }

  cargarPartido(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.partidoService.getPartido(id).subscribe((partido) => this.partido = partido);
      }
    })
  }

  create(): void {
    this.partidoService.create(this.partido)
      .subscribe(
        partido => {
          this.router.navigate(['/partidos']);
          swal('Nuevo partido', `El partido ${partido.local} VS ${partido.visitante} ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.partidoService.update(this.partido)
      .subscribe(
        json => {
          this.router.navigate(['/partidos']);
          swal('Partido Actualizado', `${json.mensaje}: ${json.partido.local} VS ${json.partido.visitante}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

}
