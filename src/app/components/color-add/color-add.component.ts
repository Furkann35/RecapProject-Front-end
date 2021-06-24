import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm:FormGroup;
  colors:Color[]=[];
  constructor(private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.ColorAddForm();
  }

  ColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  add(){
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({},this.colorAddForm.value)
      console.log(colorModel)
      this.colorService.add(colorModel).subscribe(repsonse=>{
        this.toastrService.success("Renk eklendi","Başarılı")
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }

}
