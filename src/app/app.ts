import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaTareas } from './component/lista-tareas/lista-tareas';

@Component({
  imports: [RouterOutlet, ListaTareas],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('proyecto');
}
