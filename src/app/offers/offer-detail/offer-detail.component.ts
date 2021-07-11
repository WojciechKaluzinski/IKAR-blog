import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {OfferService} from "../offer.service";
import {Offer} from "../offer";
import {AuthService} from "../../core/auth.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {

  public Editor = ClassicEditor;
  offer: Offer | undefined;
  editing: boolean = false;

  constructor(private route: ActivatedRoute, private offerService: OfferService, private router: Router, public auth: AuthService) {
  }

  ngOnInit(): void {
    this.getOffer();
    console.log(this)
  }

  getOffer() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.offerService.getOfferData(id).subscribe(data => this.offer = data)
  }

  updateOffer() {
    const formData = {
      carModel: this.offer?.carModel,
      content: this.offer?.content,
      phone: this.offer?.phone,
      owner: this.offer?.owner,
    };
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.offerService.update(id, formData).then();
    }
    this.editing = false;
  }

  delete() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.offerService.delete(id).then();
    }
    this.router.navigate(["/oferty"]).then()
  }

}
