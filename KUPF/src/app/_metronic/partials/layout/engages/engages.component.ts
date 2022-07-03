import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-engages',
  templateUrl: './engages.component.html',
  styleUrls: ['./engages.component.scss']
})
export class EngagesComponent implements OnInit {

  constructor() {  
}


  ngOnInit(): void {
    
  }
  switchToAr(lang:string) {  
    // Set Language to AR
    localStorage.setItem('lang',lang);
    // Set Language value 
    localStorage.setItem('langType','2');
    location.reload();    
  }
  switchToEn(lang:string) {  
    // Set Language to EN
    localStorage.setItem('lang',lang);
    // Set Language value
    localStorage.setItem('langType','1');
    location.reload();    
  }
}
