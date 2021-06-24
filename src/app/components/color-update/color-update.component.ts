import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colors: Color[] = [];
  color: Color;
  colorUpdate: FormGroup;
  colorId: number
  constructor(private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.colorId = params['id'];
        this.getByCarId(params['id']);
        this.getColor()
      }
    })
  }
  getColor() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

  async getByCarId(id: number) {
    this.color = (await (this.colorService.getColorsByCar(id).toPromise())).data[0]
    this.createColorUpdateForm()
  }
  createColorUpdateForm() {
    this.colorUpdate = this.formBuilder.group({

      colorName: ["", Validators.required]
    })
  }
  update() {
    if (this.colorUpdate.valid) {
      let colorModel = Object.assign({ colorId: Number(this.colorId) }, this.colorUpdate.value)
      console.log(colorModel)
      this.colorService.update(colorModel).subscribe(response => {
        this.toastrService.success("Renk güncellendi", "Başarılı")
        setTimeout(() => {
          this.router.navigate(["colors/list"])
        },
          2000);
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Error!")
            console.log(responseError.error.Errors[i].ErrorMessage);
          }
        }
      })
    } else {
      this.toastrService.error("Formu doldurunuz", "Hata")
    }
  }

}
