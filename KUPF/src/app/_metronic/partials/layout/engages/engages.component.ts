import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-engages',
  templateUrl: './engages.component.html',
  styleUrls: ['./engages.component.scss']
})
export class EngagesComponent implements OnInit {

  ifLanguageAlreadySelected: string | null;
  ifAlreadySelected:boolean;
  currentURL: string = '';
  constructor(private router: Router) { }

  // async reload(url: string): Promise<boolean> {
  //   await this.router.navigateByUrl('.', { skipLocationChange: true });
  //   return this.router.navigateByUrl(url);
  // }
  ngOnInit(): void {

  }
  // Set Language to AR
  switchToAr(language: string) {
   
    this.ifLanguageAlreadySelected = localStorage.getItem('lang');
    if (this.ifLanguageAlreadySelected != 'ar') {
      
      localStorage.setItem('lang', language);
      // Set Language value 
      localStorage.setItem('langType', '2');
    //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.router.navigate([this.currentURL]);
    //     console.log(this.currentURL);
    // });
      location.reload();
      //this.reload(this.currentURL);
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
    //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.router.navigate([this.currentURL]);
    //     console.log(this.currentURL);
    // });
      //this.reload(this.currentURL);
      location.reload();
    }
  }
  
}



