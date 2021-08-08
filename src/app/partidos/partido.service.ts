import { Injectable } from '@angular/core';
//import { DatePipe, formatDate } from '@angular/common';
import { Partido } from './partido';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';

import { Router } from '@angular/router';

@Injectable()
export class PartidoService {
  private urlEndPoint: string = 'http://localhost:8080/api/partidos';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getPartidos(): Observable<Partido[]> {
    return this.http.get(this.urlEndPoint).pipe(
      tap(response => {
        let partidos = response as Partido[];
        console.log('PartidoService: tap 1');
        partidos.forEach(partido => {
          console.log(partido.local);
        });
      }),
      map(response => {
        let partidos = response as Partido[];
        return partidos.map(partido => {
          partido.local = partido.local.toUpperCase();
          //let datePipe = new DatePipe('es');
          //partido.createAt = datePipe.transform(partido.createAt, 'EEEE dd, MMMM yyyy');
          //partido.createAt = formatDate(partido.createAt, 'dd-MM-yyyy', 'es');
          return partido;
        });
      }
      ),
      tap(response => {
        console.log('PartidoService: tap 2');
        response.forEach(partido => {
          console.log(partido.local);
        });
      })
    );
  }

  create(partido: Partido): Observable<Partido> {
    return this.http.post(this.urlEndPoint, partido, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.partido as Partido),
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getPartido(id): Observable<Partido> {
    return this.http.get<Partido>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/partidos']);
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(partido: Partido): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${partido.id}`, partido, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Partido> {
    return this.http.delete<Partido>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
