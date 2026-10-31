import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { ListaTareas } from './lista-tareas/lista-tareas';

export const routes: Routes = [
    {
        path:'login',component:Login
    },

    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },

    {
        path:'tareas',component:ListaTareas
    },
];
