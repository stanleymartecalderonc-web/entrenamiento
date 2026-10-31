import { Component, afterNextRender } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


// Define los datos que debe tener cada tarea.
interface tarea {
  identificador: number;
  titulo: string;
  completada: boolean;
  materia: string;
  fechaEntrega: string;
}

@Component({
  selector: 'lista-tareas',
  imports: [FormsModule,MatIconModule],
  templateUrl: './lista-tareas.html',
  styleUrl: './lista-tarea.css',
})

export class ListaTareas {
  // Lista que se muestra en la plantilla.
  tareas: tarea[] = [];

  // Valores conectados con los campos mediante ngModel.
  nuevaTarea: string = '';
  nuevaMateria: string = '';
  nuevaFechaEntrega: string = '';

  // Identificador disponible para la siguiente tarea.
  siguienteId: number = 4;

  constructor() {
    // Se ejecuta solo en el navegador, después del renderizado inicial.
    afterNextRender(() => {
      this.cargarTareas();
    });
  }

  // Invierte el estado y guarda la lista actualizada.
  cambiarEstado(tarea: tarea) {
    tarea.completada = !tarea.completada;
    this.guardarTareas();
  }

  // Guarda la lista completa como texto.
  guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  // Recupera la lista y calcula el siguiente identificador.
  cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');

    if (tareasGuardadas) {
      this.tareas = JSON.parse(tareasGuardadas);
      this.siguienteId =
        Math.max(0, ...this.tareas.map(tarea => tarea.identificador)) + 1;
    }
  }

  // Excluye la tarea elegida y guarda el resultado.
  eliminarTarea(identificador: number) {
    this.tareas = this.tareas.filter(
      tarea => tarea.identificador !== identificador
    );
    this.guardarTareas();
  }

  agregarTarea() {
    // Limpia los valores escritos.
    const tituloLimpio = this.nuevaTarea.trim();
    const materiaLimpia = this.nuevaMateria.trim();
    const fechaLimpia = this.nuevaFechaEntrega.trim();

    // Impide agregar tareas con campos vacíos.
    if (tituloLimpio === '') {
      return;
    }

    if (materiaLimpia === '') {
      return;
    }

    if (fechaLimpia === '') {
      return;
    }

    // Agrega la tarea y aumenta el contador.
    this.tareas.push({
      identificador: this.siguienteId++,
      titulo: tituloLimpio,
      materia: materiaLimpia,
      completada: false,
      fechaEntrega: fechaLimpia,
    });

    this.guardarTareas();

    // Vacía los campos del formulario.
    this.nuevaTarea = '';
    this.nuevaMateria = '';
    this.nuevaFechaEntrega = '';
  }
}