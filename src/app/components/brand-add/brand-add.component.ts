import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
   brandAddForm:FormGroup;
   brands: Brand[] = [];
  constructor(private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.BrandAddForm();
    this.getBrands();
  }

BrandAddForm(){
  this.brandAddForm = this.formBuilder.group({
    brandName:["",Validators.required]
  })
}


add() {
  if (this.brandAddForm.valid) {
    let brandModel = Object.assign({}, this.brandAddForm.value)
    console.log(brandModel)
    this.brandService.add(brandModel).subscribe(response => {
      this.toastrService.success("Araç eklendi", "Başarılı")
    })
  } else {
    this.toastrService.error("Formunuz eksik", "Dikkat")
  }
}

getBrands(){
  this.brandService.getBrands().subscribe(response=>{
    this.brands = response.data
  })
}

}
