import {NgModule} from '@angular/core';
import {PostDashboardComponent} from './post-dashboard/post-dashboard.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {PostListComponent} from './post-list/post-list.component';
import {PostService} from "./post.service";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";

const routes: Routes = [
  { path: 'blog', component:PostListComponent},
  { path: 'blog/:id', component:PostDetailComponent},
  { path: 'dashboard', component:PostDashboardComponent}
];

@NgModule({
    declarations: [
        PostDashboardComponent,
        PostDetailComponent,
        PostListComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        CKEditorModule
    ],
    providers: [PostService]
})
export class PostsModule {
}
