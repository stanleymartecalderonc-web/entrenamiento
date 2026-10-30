// Importa lo necesario para definir un componente de Angular.
import { Component } from '@angular/core';

// Permite usar ngModel para conectar el campo de texto con una propiedad.
import { FormsModule } from '@angular/forms';

// Define la estructura que debe tener cada tarea.
interface tarea {
  // Número que identifica una tarea.
  identificador: number;

  // Texto de la tarea.
  titulo: string;

  // Indica si está completada: true significa sí y false significa no.
  completada: boolean;
}

// Configura el componente.
@Component({
  // Nombre de la etiqueta HTML que permite mostrar este componente.
  selector: 'lista-tareas',

  // Habilita las herramientas de formularios en su plantilla.
  imports: [FormsModule],

  // Indica qué archivo contiene el HTML del componente.
  templateUrl: './lista-tareas.html',
})


export class ListaTareas {



  cambiarEstado( tarea:tarea){
    tarea.completada = !tarea.completada
    this.guardarTareas
  }


  //angular ejecuta este metodo cuando iniciamos el componente y recuperamos las tareas guardadas
  ngOnInit(){
    this.cargarTareas()
  }

   //Aqui guardamos la lista completa como texto
  guardarTareas(){
    localStorage.setItem('tareas', JSON.stringify(this.tareas))
   
  }

  //recupera el texto del localstorage y si existe lo convierte en un arreglo
  cargarTareas( ){
      const tareasGuardadas =  localStorage.getItem('tareas')
      if (tareasGuardadas) {
       this.tareas = JSON.parse(tareasGuardadas)
       this.siguienteId = Math.max(0,...this.tareas.map(tarea => tarea.identificador))+1
      }
  }

  //metodo para eliminar tarea segun su identificador
  eliminarTarea(identificador:number){this.tareas =
    this.tareas.filter(tarea => tarea.identificador !== identificador)
    this.guardarTareas()
  }


  // Guarda la lista de tareas. Cada elemento debe cumplir la interfaz tarea.
  tareas: tarea[] = [
    // Primera tarea de ejemplo.
    {
      identificador: 1,
      titulo: 'Tarea 1',
      completada: false
    },

    // Segunda tarea: comienza completada.
    {
      identificador: 2,
      titulo: 'Tarea 2',
      completada: true
    },

    // Tercera tarea de ejemplo.
    {
      identificador: 3,
      titulo: 'Tarea 3',
      completada: false
    }
  ];



  // Guarda el texto del input conectado mediante ngModel.
  nuevaTarea: string = '';



  // Guarda el identificador que recibirá la próxima tarea.
  siguienteId: number = 4;


  // Se ejecuta cuando pulsas el botón Agregar.
  agregarTarea() {

      // aqui se agrega una validacion para impedir que se manden tareas vacias
    const tituloLimpio = this.nuevaTarea.trim()

        if  (tituloLimpio=== ''){
        return
      }


    // Añade un objeto nuevo al final del arreglo.
    this.tareas.push({

  
        


      // Usa el identificador actual y después aumenta el contador en uno.
      identificador: this.siguienteId++,

      // Usa como título el texto escrito en el input.
      titulo: tituloLimpio,

      // La nueva tarea comienza sin completar.
      completada: false
    });

    // Vacía la propiedad y, mediante ngModel, también el campo de texto.
    this.nuevaTarea = '';

    this.guardarTareas()

  }
}