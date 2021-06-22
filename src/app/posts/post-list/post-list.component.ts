import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {Observable} from "rxjs";
import {Post} from "../post";
import {PostService} from "../post.service";
import {AuthService} from "../../core/auth.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
    posts: Observable<Post[]> | undefined

    constructor(private postService: PostService, public auth: AuthService) {
    }

    ngOnInit(): void {
      this.posts = this.postService.getPosts();
      console.log(this)
    }

    delete(id: string){
        this.postService.delete(id).then();
    }

}
