import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/auth.service";
import {OfferService} from "../offer.service";
import {Observable, Subscription} from "rxjs";
import { AngularFireStorage } from 'angularfire2/storage';
import {finalize} from "rxjs/operators";


@Component({
  selector: 'app-offer-dashboard',
  templateUrl: './offer-dashboard.component.html',
  styleUrls: ['./offer-dashboard.component.css']
})
export class OfferDashboardComponent implements OnInit {

  carModel: string | undefined;
  image: string = '';
  content: string | undefined;
  phone: string = '';
  owner: string = '';

  saving: string = 'Utwórz Ofertę';

  uploadPercent?: Observable<number>;
  downloadURL?: Observable<string>;

  private fileRef: any;


  constructor(private auth: AuthService, private offerService: OfferService, private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
  }

  createOffer() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image,
      published: new Date(),
      carModel: this.carModel,
      phone: this.phone,
      owner: this.owner,
    };
    this.offerService.create(data);
    this.carModel = '';
    this.content = '';
    this.phone = '';
    this.owner = '';
    this.saving = 'Oferta utworzony';
    setTimeout(() => (this.saving = 'Utwórz Ofertę'), 3000)
  }

  // @ts-ignore
  async uploadImage(event) {
    const file = event.target.files[0];
    const path = `offers/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('Możesz wybrać tylko obrazek!')
    } else {
      const task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      // @ts-ignore
      this.uploadPercent = task.percentageChanges();
      await task;
      console.log('Image Uploaded!');
      this.image = await ref.getDownloadURL().toPromise();
    }
  }

}
