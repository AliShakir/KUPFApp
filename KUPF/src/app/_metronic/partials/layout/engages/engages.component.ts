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
    localStorage.setItem('lang',lang);
    location.reload();    
  }
  switchToEn(lang:string) {  
    localStorage.setItem('lang',lang);
    location.reload();    
  }
}
