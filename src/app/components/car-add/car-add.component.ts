import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm: FormGroup;
  brands: Brand[] = [];
  colors: Color[] = [];

  constructor(private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private router: Router) { }

  ngOnInit(): void {
    this.getBrands()
    this.getColors()
    this.CarAddForm()
  }

  CarAddForm() {
    this.carAddForm = this.formBuilder.group({
      carName: ["", Validators.required],
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
    })
  }


  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value)
      console.log(carModel)
      this.carService.add(carModel).subscribe(response => {
        this.toastrService.success("Araç eklendi", "Başarılı")
        this.back();
      })
    } else {
      this.toastrService.error("Formunuz eksik", "Dikkat")
    }
  }


  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  back() {
    this.router.navigate(["cars/list"])
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }
}


