import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a App Partidos';

  curso: string = "Angular con Spring 5";

  profesor: string = "Carlos Molina"
}
