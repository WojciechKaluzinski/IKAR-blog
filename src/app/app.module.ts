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
import  { OffersModule} from "./offers/offers.module";

import {Routes, RouterModule} from "@angular/router";
import { ContactComponent } from './contact/contact.component';
import {MatExpansionModule} from '@angular/material/expansion';


//TODO tutaj będą jakieś zmiany jak będę chciał mieć home page
const routes: Routes = [
    { path: 'kontakt', component: ContactComponent},
    { path: '', redirectTo: '/blog', pathMatch:'full'},
    { path: '', loadChildren: './posts/posts.module#PostsModule' },
    { path: 'oferty', component: OffersModule},
    { path: '', loadChildren: './offers/offers.module#OffersModule' },
];

@NgModule({
    declarations: [
        AppComponent,
        ContactComponent
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
        PostsModule,
        OffersModule,
        MatExpansionModule
    ],
    exports: [MatExpansionModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
