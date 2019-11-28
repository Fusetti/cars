import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { StoreComponent } from './store/store.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { InsertBrandComponent } from './insert-brand/insert-brand.component';
import { SearchBrandsComponent } from './search-brands/search-brands.component';
import { UpdateBrandComponent } from './update-brand/update-brand.component';
import { ShowBrandsComponent } from './show-brands/show-brands.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { PricePipe } from './pipes/price.pipe';
import { InsertModelComponent } from './insert-model/insert-model.component';
import { SearchModelComponent } from './search-model/search-model.component';
import { ShowAllModelsComponent } from './show-all-models/show-all-models.component';
import { UpdateModelComponent } from './update-model/update-model.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    StoreComponent,
    AboutComponent,
    ContactComponent,
    InsertBrandComponent,
    SearchBrandsComponent,
    UpdateBrandComponent,
    ShowBrandsComponent,
    PageNotFoundComponent,
    PricePipe,
    InsertModelComponent,
    SearchModelComponent,
    ShowAllModelsComponent,
    UpdateModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private modalConfig: NgbModalConfig) {
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
  }

}
