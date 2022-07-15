import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  lang: any;
  constructor() {}

  ngOnInit(): void {
    
    //this.lang = localStorage.getItem('lang') || 'en';  
    
  }
  changeLang(e: any) {    
    localStorage.setItem('lang', e.target.value);
    window.location.reload();
  }
}
