import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  constructor(private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required]
    })
  }

  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value)
      let registerModel = Object.assign({}, this.registerForm.value)

      this.authService.register(registerModel).subscribe(response => {
        this.toastrService.success("Başarıyla kayıt olundu")
        this.loginRouter();
      },responseError=>{
        this.toastrService.error(responseError.error)
      }
      )
    }else{
      this.toastrService.error("Form boş bırakılamaz","Hata")
    }
  }

  loginRouter() {
    this.toastrService.info("Giriş sayfasına yönlendiriliyorsunuz", "Bilgi")
    setTimeout(() => {
      this.router.navigate(["login"]);
    }, 700);
  }
}
