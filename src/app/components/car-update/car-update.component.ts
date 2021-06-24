import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carId: number
  carUpdate: FormGroup
  car: Car;
  brands: Brand[] = [];
  colors: Color[] = []
  constructor(private colorService: ColorService,
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if (params['id']) {
        this.carId = params['id'];
        this.getByCarId(params['id']);
        this.getBrands()
        this.getColor()
      }
    })
    
  }

  getColor() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  createCarUpdateForm() {
    this.carUpdate = this.formBuilder.group({
      carName: [this.car.carName, Validators.required],
      description: [this.car.description, Validators.required],
      modelYear: [this.car.modelYear, Validators.required],
      colorId: ["", Validators.required],
      brandId: ["", Validators.required],
      dailyPrice: [this.car.dailyPrice, Validators.required]
    })
  }

  async getByCarId(id:number) {
    this.car = (await(this.carService.getCarDetailByCarId(id).toPromise())).data[0]
    this.createCarUpdateForm()
  }

  update() {
    if (this.carUpdate.valid) {
      let carModel = Object.assign({carId:Number(this.carId)}, this.carUpdate.value)
      console.log(carModel)

      this.carService.update(carModel).subscribe(response => {
        this.toastrService.success("Araç güncellendi", "Başarılı")
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Error!")
            console.log(responseError.error.Errors[i].ErrorMessage);
          }
        }
      })
    }else{
      this.toastrService.error("Formu doldurunuz","Hata")
    }
  }

}
