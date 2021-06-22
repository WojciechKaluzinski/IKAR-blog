import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {PostService} from "../post.service";
import {Post} from "../post";
import {AuthService} from "../../core/auth.service";

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

    post: Post | undefined;
    editing: boolean = false;

    constructor(private route: ActivatedRoute, private postService: PostService, private router: Router, public auth: AuthService) {
    }

    ngOnInit(): void {
        this.getPost();
        console.log(this)
    }

    getPost() {
        const id = this.route.snapshot.paramMap.get('id');
        return this.postService.getPostData(id).subscribe(data => this.post = data)
    }

    updatePost(){
        const formData = {
           title: this.post?.title,
           content: this.post?.content
        };
        const id = this.route.snapshot.paramMap.get('id');
        if (id != null) {
            this.postService.update(id, formData).then();
        }
        this.editing = false;
    }

    delete() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id != null) {
            this.postService.delete(id).then();
        }
        this.router.navigate(["/blog"]).then()
    }

}
