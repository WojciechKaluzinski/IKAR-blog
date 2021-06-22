import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'

import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { environment } from '../environments/environment'

import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module';
import { PostsModule } from './posts/posts.module'

import {Routes, RouterModule} from "@angular/router";


//TODO tutaj będą jakieś zmiany jak będę chciał mieć home page
const routes: Routes = [
    { path: '', redirectTo: '/blog', pathMatch:'full'},
    { path: '', loadChildren: './posts/posts.module#PostsModule' }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        PostsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
