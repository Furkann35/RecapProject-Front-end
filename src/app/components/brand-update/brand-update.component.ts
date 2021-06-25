import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brands: Brand[] = [];
  brand:Brand;
  brandUpdate: FormGroup;
  brandId:number;
  constructor(private brandService: BrandService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe((params)=>{
        if (params['id']) {
          this.brandId = params['id'];
          this.getByCarId(params['id']);
          this.getBrands()
        }
      })
    }
  
    getBrands() {
      this.brandService.getBrands().subscribe(response => {
        this.brands = response.data
      })
    }
  createBrandUpdateForm() {
    this.brandUpdate = this.formBuilder.group({
      brandName: ["", Validators.required]
    })
  }

  async getByCarId(id: number) {
    this.brand = (await (this.brandService.getBrandsByCar(id).toPromise())).data[0]
    this.createBrandUpdateForm()
  }

  update() {
    if (this.brandUpdate.valid) {
      let brandMode = Object.assign({brandId:Number(this.brandId)}, this.brandUpdate.value)
      console.log(brandMode)
      this.brandService.update(brandMode).subscribe(response => {
        this.toastrService.success("Marka güncellendi", "Başarılı")
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
