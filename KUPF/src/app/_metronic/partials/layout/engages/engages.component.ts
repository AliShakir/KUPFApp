import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-engages',
  templateUrl: './engages.component.html',
  styleUrls: ['./engages.component.scss']
})
export class EngagesComponent implements OnInit {

  ifLanguageAlreadySelected: string | null;
  ifAlreadySelected:boolean;
  constructor() { }


  ngOnInit(): void {

  }
  // Set Language to AR
  switchToAr(language: string) {
    this.ifLanguageAlreadySelected = localStorage.getItem('lang');
    if (this.ifLanguageAlreadySelected != 'ar') {
      localStorage.setItem('lang', language);
      // Set Language value 
      localStorage.setItem('langType', '2');
      location.reload();
    }



  }
  // Set Language to EN
  switchToEn(language: string) {
    this.ifLanguageAlreadySelected = localStorage.getItem('lang');
    if (this.ifLanguageAlreadySelected != 'en') {
      this.ifAlreadySelected = true;
      localStorage.setItem('lang', language);
      // Set Language value
      localStorage.setItem('langType', '1');
      location.reload();
    }
  }
}


