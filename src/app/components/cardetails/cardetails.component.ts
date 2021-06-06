import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.css']
})
export class CardetailsComponent implements OnInit {
  carDto: CarDto
  dataLoaded = false;
  baseImageUrl = "https://localhost:44341"
  defaultImage = "/images/indir.png"
  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCarDetailByCarId(params["carId"])
      }
    })
  }



  getCarDetailByCarId(carId:number){
    this.carService.getCarDetailDtoByCarId(carId).subscribe(response=>{
      this.carDto = response.data[0]
      console.log(this.carDto)
      this.dataLoaded = true
    })
  }

  setImageClass(path:string):string{
    if(path === this.carDto.images[0]){
      return "carousel-item active"
    }
    else{
      return "carousel-item"
    }
  }

}
