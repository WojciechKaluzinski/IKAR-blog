import {NgModule} from '@angular/core';
import {OfferService} from "./offer.service";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import { OfferDashboardComponent } from './offer-dashboard/offer-dashboard.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

const routes: Routes = [
  { path: 'oferty', component:OfferListComponent},
  { path: 'oferty/:id', component:OfferDetailComponent},
  { path: 'offer_dashboard', component:OfferDashboardComponent}
];

@NgModule({
  declarations: [
    OfferDashboardComponent,
    OfferDetailComponent,
    OfferListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CKEditorModule
  ],
  providers: [OfferService]
})
export class OffersModule {
}
