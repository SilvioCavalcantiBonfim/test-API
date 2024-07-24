import { Routes } from '@angular/router';
import { DocComponent } from './page/doc/doc.component';
import { HomeComponent } from './page/home/home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/API/test',
        pathMatch: 'full'
    },
    {
        path: 'doc',
        component: DocComponent
    },
    {
        path: 'API/test',
        component: HomeComponent
    }
];
