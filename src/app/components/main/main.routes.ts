import { Route } from "@angular/router";
import { UsersComponent } from "../users/users.component";
import { PaymentsComponent } from "../payments/payments.component";
import { CountriesComponent } from "../countries/countries.component";
import { ContentComponent } from "../content/content.component";
import { DetailsComponent } from "../details/details.component";

export default [
    { path: '', component: ContentComponent },
    { path: 'users', component: UsersComponent },
    { path: 'payments', component: PaymentsComponent },
    { path: 'countries', component: CountriesComponent },
    { path: ':user/details', component: DetailsComponent },
    { path: 'countries/details', component: DetailsComponent },
] as Route[];