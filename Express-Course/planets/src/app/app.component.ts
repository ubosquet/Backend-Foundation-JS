import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 2 Planets';
  staticPath: string = 'http://localhost:3001/staticPlanets';
  starTrekPath: string = 'http://localhost:3001/starTrekPlanets';
}