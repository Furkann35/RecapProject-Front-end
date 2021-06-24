import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardetailsComponent } from './components/cardetails/cardetails.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  //HOME
  { path: "", pathMatch: "full", component: CarComponent },
  { path: "cars", component: CarComponent },
  { path: "cars/brand/:brandId", component: CarComponent },
  { path: "cars/color/:colorId", component: CarComponent },
  { path: "cars/cardetail/:carId", component: CardetailsComponent },
  { path: "cars/filter/:brandId/:colorId", component: CarComponent },
  { path: "cars/rental/:brandId/", component: RentalComponent },

  //Car
  { path: "cars/list", component: CarListComponent },
  { path: "cars/list/add", component: CarAddComponent },
  { path: "cars/list/update/:id", component: CarUpdateComponent,  },

  //Color
  { path: "colors/list", component: ColorListComponent },
  { path: "colors/list/add", component: ColorAddComponent },
  { path: "colors/list/update/:id", component: ColorUpdateComponent },


  //Brand
  { path: "brands/list", component: BrandListComponent },
  { path: "brands/list/add", component: BrandAddComponent },
  { path: "brands/list/update/:id", component: BrandUpdateComponent },

  //payment
  { path: "payment/:carid", component: PaymentComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
