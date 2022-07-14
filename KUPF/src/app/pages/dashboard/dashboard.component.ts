import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    
    if (localStorage.getItem('lang') === null) {
      
      localStorage.setItem('lang','en');
      
      localStorage.setItem('langType','1');
      
    }   
    
  }
}
