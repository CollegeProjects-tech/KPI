import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})


export class SidebarComponent implements OnInit {
  data: any;

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.data = JSON.parse(localStorage.getItem("data") || '{}');
      console.log(this.data);
    }

  }


}
