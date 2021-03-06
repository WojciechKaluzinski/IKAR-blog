import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {NavbarComponent} from './navbar/navbar.component';
import {FormsModule} from "@angular/forms";
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        MatMenuModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        NavbarComponent,
        RouterModule,
        FormsModule,
        MatMenuModule
    ]
})
export class SharedModule {
}
