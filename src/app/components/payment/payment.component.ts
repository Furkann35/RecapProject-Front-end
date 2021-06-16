import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  diffDays:number 
  car: Car
  paymentForm: FormGroup
  price: number 
  rentalModel:Rental
  constructor(private data:DataTransferService<Rental>,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private creditCardService: CreditCardService,
    private rentalService: RentalService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carid"]) {
        this.getCarDetailByCarId(params["carid"])
      }
    })
    this.rentalModel = this.data.getData();
    this.createPaymentForm()
  }

  getCarDetailByCarId(carId: number) {
    this.carService.getCarDetailDtoByCarId(carId).subscribe(response => {
      this.car = response.data[0]
      this.paymentCalculator()
    })
  }

  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      cardMonth: ['', Validators.required],
      cardYear: ['', Validators.required],
      cardCcv: ['', Validators.required],
      cardName: ['', Validators.required],
    })
  }

  payment(){
    if(this.paymentForm.valid){
      let creditCardModel : CreditCard = Object.assign(this.paymentForm.value)
      this.creditCardService.checkCreditCard(creditCardModel).subscribe((response)=>{
        this.rentalService.add(this.rentalModel).subscribe(response=>{
          this.toastrService.success("Araç başarıyla kiralandı","Başarılı")
        })
      },errorResponse=>{
        this.toastrService.error("Kredi kartı bulunamadı","Hata")
      })
    }else{
      //console.log("tüm alanları doldurun  ")  
      this.toastrService.error("Tüm alanları doldurun","Hata")

    }
    
  }

  paymentCalculator() {
    if (this.rentalModel.returnDate != null) {
      var date1 = new Date(this.rentalModel.returnDate.toString());
      var date2 = new Date(this.rentalModel.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();

      this.diffDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.price = this.diffDays * this.car.dailyPrice;

    }
  }


}
