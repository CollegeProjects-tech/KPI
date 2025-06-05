import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/auth.service';
import { LayoutService } from '../shared/layout.service';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  locatstorage_data:any;

  constructor(private api:ApiService,private fb: FormBuilder, private router: Router, private auth: AuthService,private layoutService: LayoutService) {}

  ngOnInit() {

       if (typeof window !== 'undefined' && window.localStorage) {
      this.locatstorage_data = JSON.parse(localStorage.getItem("data") || '{}');
      // console.log(this.data);
    }

    if (this.auth.isLoggedIn()) {
      this.router.navigate([this.locatstorage_data.usertype]);
    }

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['staff']);
    }

    this.loginForm = this.fb.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.auth.login(this.loginForm.value).subscribe(
      (res: any) => {
        this.isLoading = false;

        if (res.status === 'success') {
          this.router.navigate([res.data.usertype]);
        } else {
          alert('Invalid credentials');
        }
      },
      (err: any) => {
        this.isLoading = false;
        alert(err?.error?.title || 'Login failed');
        console.error(err);
      }
    );
  }
}
