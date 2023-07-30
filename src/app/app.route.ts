import { Route } from '@angular/router';
import { MainComponent } from './components/main/main.component';

export const APP_ROUTE: Route[] = [{path: '', component: MainComponent, loadChildren: () => import('./components/main/main.routes')}];