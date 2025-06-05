import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { AuthService } from '../shared/auth.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginObj: any = {
    userid: '',
    password: ''
  };
  res:any;

  constructor(private router: Router,private auth:AuthService) {}

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['staff']);
    }
  }

 login() {
  this.auth.login(this.loginObj).subscribe(
    (res: any) => {
      console.log(res.status);
      console.log(res.data);

      if (res.status == "success") {
        this.router.navigate([res.data.usertype]);
      } else {
        alert("Not Found");
      }
    },
    (err: any) => {
      alert(err.error.title);
      console.error(err);
    }
  );
}
}
