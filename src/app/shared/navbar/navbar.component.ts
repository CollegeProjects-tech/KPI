import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  data: any;

constructor(private router:Router){}
  logout(){
  localStorage.clear();
    this.router.navigate(['/']);
}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.data = JSON.parse(localStorage.getItem("data") || '{}');
      // console.log(this.data);
    }

  }

}
