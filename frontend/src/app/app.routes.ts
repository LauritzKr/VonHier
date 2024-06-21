import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { OfferCreateComponent } from './offer-create/offer-create.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'offers', component: HomepageComponent },
  { path: 'offers/:id', component: OfferDetailsComponent },
  { path: 'create', component: OfferCreateComponent },
  { path: 'profile', component: ProfileComponent },
];
