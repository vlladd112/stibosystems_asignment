import { Route } from "@angular/router";
import { UsersComponent } from "../users/users.component";
import { PaymentsComponent } from "../payments/payments.component";
import { CountriesComponent } from "../countries/countries.component";
import { ContentComponent } from "../content/content.component";
import { UsersDetailsComponent } from "../users-details/users-details.component";
import { CountriesDetailsComponent } from "../countries-details/countries-details.component";

export default [
    { path: '', component: ContentComponent },
    { path: 'users', component: UsersComponent },
    { path: 'payments', component: PaymentsComponent },
    { path: 'countries', component: CountriesComponent },
    { path: 'users/details', component: UsersDetailsComponent },
    { path: 'countries/details', component: CountriesDetailsComponent },
] as Route[];