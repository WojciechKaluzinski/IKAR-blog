import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {Observable} from "rxjs";
import {Offer} from "../offer";
import {OfferService} from "../offer.service";
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {
  offers: Observable<Offer[]> | undefined

  constructor(private offerService: OfferService, public auth: AuthService) {
  }

  ngOnInit(): void {
    this.offers = this.offerService.getOffers();
    console.log(this)
  }

  delete(id: string){
    this.offerService.delete(id).then();
  }

}
