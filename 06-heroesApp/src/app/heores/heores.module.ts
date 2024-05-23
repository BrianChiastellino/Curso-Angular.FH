import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeoresRoutingModule } from './heores-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { HeroPageComponent } from './pages/heroPage/heroPage.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { HeroImagePipe } from './pipe/hero-image.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/dialog/confirmDialog/confirmDialog.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    SearchPageComponent,
    ListPageComponent,
    NewPageComponent,
    HeroPageComponent,
    CardComponent,
    ConfirmDialogComponent,

    HeroImagePipe
  ],
  imports: [
    CommonModule,
    HeoresRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class HeoresModule { }
