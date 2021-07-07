import {Injectable} from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'
import {Offer} from "./offer";
import {map} from "rxjs/operators";
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable()
export class OfferService {
  offersCollection: AngularFirestoreCollection<Offer>;
  offerDoc: AngularFirestoreDocument<Offer> | undefined;

  constructor(private afs: AngularFirestore) {
    this.offersCollection= this.afs.collection('offers', ref =>
        ref.orderBy('published', 'desc')
    )
  }


  getOffers() {
    return this.offersCollection.snapshotChanges().pipe(map((actions: any) => {
      return actions.map((a: any) => {
        const data = a.payload.doc.data() as Offer;
        const id = a.payload.doc.id;
        return {id, ...data}
      })
    }))
  }

  getOfferData(id: string | null) {
    this.offerDoc = this.afs.doc<Offer>(`offers/${id}`)
    return this.offerDoc.valueChanges()
  }

  create(data: { image: string; author: string | boolean | ((control: AbstractControl) => (ValidationErrors | null)) | undefined; published: Date; authorId: string; owner: string | undefined; content: string | undefined }) {
    // @ts-ignore
    this.offersCollection.add(data)
  }


  getOffer(id: string) {
    return this.afs.doc<Offer>(`offers/${id}`)
  }

  delete(id: string) {
    return this.getOffer(id).delete();
  }

  update(id: string, formData: Partial<Offer>) {
    return this.getOffer(id).update(formData);
  }
}


