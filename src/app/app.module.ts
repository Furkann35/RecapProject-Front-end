import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
​import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CardetailsComponent } from './components/cardetails/cardetails.component';
import { FilterCarPipe } from './pipes/filter-car.pipe';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterCarComponent } from './components/filter-car/filter-car.component';
import { CarRentalComponent } from './components/car-rental/car-rental.component';
import { PaymentComponent } from './components/payment/payment.component';

import { ToastrModule } from 'ngx-toastr';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorComponent,
    BrandComponent,
    NaviComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    CardetailsComponent,
    FilterCarPipe,
    FilterBrandPipe,
    FilterColorPipe,
    FilterCarComponent,
    CarRentalComponent,
    PaymentComponent,
    CarAddComponent,
    CarListComponent,
    BrandAddComponent,
    ColorAddComponent,
    BrandListComponent,
    ColorListComponent,
    CarUpdateComponent,
    ColorUpdateComponent,
    BrandUpdateComponent,
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
