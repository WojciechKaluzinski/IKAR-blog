import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/auth.service";
import {PostService} from "../post.service";
import {Observable, Subscription} from "rxjs";
import { AngularFireStorage } from 'angularfire2/storage';
import {finalize} from "rxjs/operators";


@Component({
    selector: 'app-post-dashboard',
    templateUrl: './post-dashboard.component.html',
    styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

    title: string | undefined;
    image: string = '';
    content: string | undefined;
    linkAddress: string = '';
    linkText: string = '';

    saving: string = 'Utwórz post';

    uploadPercent?: Observable<number>;
    downloadURL?: Observable<string>;

    private fileRef: any;


    constructor(private auth: AuthService, private postService: PostService, private storage: AngularFireStorage) {
    }

    ngOnInit(): void {
    }

    createPost() {
        const data = {
            author: this.auth.authState.displayName || this.auth.authState.email,
            authorId: this.auth.currentUserId,
            content: this.content,
            image: this.image,
            published: new Date(),
            title: this.title,
            linkAddress: this.linkAddress,
            linkText: this.linkText,
        };
        this.postService.create(data);
        this.title = '';
        this.content = '';
        this.linkAddress = '';
        this.linkText = '';
        this.saving = 'Post utworzony';
        setTimeout(() => (this.saving = 'Utwórz post'), 3000)
    }

    // @ts-ignore
   async uploadImage(event) {
       const file = event.target.files[0];
       const path = `posts/${file.name}`;
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
