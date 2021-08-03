import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customerDto';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.css']
})
export class CardetailsComponent implements OnInit {
  isCarRentable: Boolean
  car: Car
  dateForm: FormGroup
  dataLoaded = false;
  baseImageUrl = "https://localhost:44341"
  defaultImage = "/images/indir.png"
  toastRef = false
  customerDto: Customer
  findexPoint:number;
  constructor(private carService: CarService, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private router: Router,
    private toastrService: ToastrService,
    private data: DataTransferService<Rental>
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCarDetailByCarId(params["carId"])
      }
    })
    this.createDateForm()
  }

  createDateForm() {
    this.dateForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  routePayment() {
    this.router.navigate(['payment/' + this.car.carId])
  }

  // rent() {
  //   if (this.dateForm.valid) {
  //     let rentalModel: Rental = Object.assign({ carId: this.car.carId, customerId: 1 }, this.dateForm.value)
  //     this.data.setData(rentalModel)
  //     this.routePayment()
  //   } else {
  //     console.log("form valid değil")

  //     this.toastrService.error("Tarihleri girmelisiniz")
  //   }
  // }


  checkIsCarRentable() {
    if (this.dateForm.valid) {
      console.log(this.customerDto)
      // if (this.customerDto.findexPoint < 400) {
      //   console.log("400den büyük")
        let rentalModel: Rental = Object.assign({ carId: this.car.carId, customerId: 1 }, this.dateForm.value)
        var date1 = new Date(rentalModel.returnDate.toString());
        var date2 = new Date(rentalModel.rentDate.toString());
        if (date1.getTime() > date2.getTime()) {
          this.rentalService.checkIsCarRentable(rentalModel).subscribe((response) => {
            this.isCarRentable = response.success
            if (response.success) {
              this.data.setData(rentalModel)
              this.routePayment()
            }
          }, (responseError) => {
            this.toastrService.error(responseError.error.message);
          })
        } else {
          this.toastrService.error("Tarihleri düzgün seçin", "Hata")
        }
      // } else {
      //   console.log("400den küçük")
      // }
    } else {
      this.toastrService.error("Tüm alanları doldurun", "Hata")
    }

  }

  getCarDetailByCarId(carId: number) {
    this.carService.getCarDetailDtoByCarId(carId).subscribe(response => {
      this.car = response.data[0]
      console.log(this.car)
      this.dataLoaded = true
    })
  }

  setImageClass(path: string): string {
    if (path === this.car.images[0]) {
      return "carousel-item active"
    }
    else {
      return "carousel-item"
    }
  }

}
