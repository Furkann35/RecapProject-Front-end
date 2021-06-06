import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { HttpClient } from '@angular/common/http';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carDtos: CarDto[]
  baseImageUrl = "https://localhost:44341"
  defaultImage = "/images/indir.png"
  dataLoaded = false;
  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarsByBrandId(params["brandId"])
      } else if (params["colorId"]) {
        this.getColorsByColorId(params["colorId"])
      } else {
        this.getCars()
        this.getCarDtos()
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data
      this.dataLoaded = true
    })
  }

  getCarDtos() {
    this.carService.getCarDtos().subscribe(response => {
      this.carDtos = response.data
      this.dataLoaded = true
    })
  }


  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe(response => {
      this.carDtos = response.data
      this.dataLoaded = true
    })
  }

  getColorsByColorId(colorId: number) {
    this.carService.getColorsByColorId(colorId).subscribe(response => {
      this.carDtos = response.data
      this.dataLoaded = true
    })
  }

  getCarDetailByCarId(carId:number){
    this.carService.getCarDetailByCarId(carId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true
    })
  }

}
