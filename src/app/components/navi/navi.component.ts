import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  users: User[] = []
  user: User;
  Id: number;

  constructor(private authService: AuthService,
    private localStorage: LocalStorageService,
    private router: Router,
    private toastrService: ToastrService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params) => {
    //   if (params['id']) {
    //     this.Id = params['id'];
    //     this.getByUserId(params['id']);
    //   }
    // })
  }
  login() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    this.authService.logOut();
  }

  // getByUserId(id: number) {
  //   this.userService.getUserDetailByUserId(id).subscribe((response => {
  //     this.user = response.data
  //   }))
  // }

}
