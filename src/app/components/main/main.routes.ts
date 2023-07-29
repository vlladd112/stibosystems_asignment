import { Route } from "@angular/router";
import { UsersComponent } from "../users/users.component";
import { PaymentsComponent } from "../payments/payments.component";
import { CountriesComponent } from "../countries/countries.component";
import { ContentComponent } from "../content/content.component";

export const MAIN_ROUTE: Route[] = [
    { path: '', component: ContentComponent },
    { path: 'users', component: UsersComponent },
    { path: 'payments', component: PaymentsComponent },
    { path: 'countries', component: CountriesComponent }
]