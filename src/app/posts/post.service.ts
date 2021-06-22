import {Injectable} from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'
import {Post} from "./post";
import {map} from "rxjs/operators";
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable()
export class PostService {
    postsCollection: AngularFirestoreCollection<Post>;
    postDoc: AngularFirestoreDocument<Post> | undefined;

    constructor(private afs: AngularFirestore) {
        this.postsCollection = this.afs.collection('posts', ref =>
            ref.orderBy('published', 'desc')
        )
    }


    getPosts() {
        return this.postsCollection.snapshotChanges().pipe(map((actions: any) => {
            return actions.map((a: any) => {
                const data = a.payload.doc.data() as Post;
                const id = a.payload.doc.id;
                return {id, ...data}
            })
        }))
    }

    getPostData(id: string | null) {
        this.postDoc = this.afs.doc<Post>(`posts/${id}`)
        return this.postDoc.valueChanges()
    }

  create(data: { image: string; author: string | boolean | ((control: AbstractControl) => (ValidationErrors | null)) | undefined; published: Date; authorId: string; title: string | undefined; content: string | undefined }) {
    // @ts-ignore
    this.postsCollection.add(data)
  }


  getPost(id: string) {
        return this.afs.doc<Post>(`posts/${id}`)
    }

    delete(id: string) {
        return this.getPost(id).delete();
    }

    update(id: string, formData: Partial<Post>) {
      return this.getPost(id).update(formData);
    }
}

