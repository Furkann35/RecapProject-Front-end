import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

   async  login(){
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      let loginModel = Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        
        this.toastrService.info(response.message,"Giriş yapıldı")
        localStorage.setItem("token",response.data.token);
        this.router.navigate(["/"]);
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }else{
      this.toastrService.error("Form boş","Hata")
    }
  }

  registerRouter(){
    this.router.navigate(["register"])
  }

}