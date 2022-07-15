import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-engages',
  templateUrl: './engages.component.html',
  styleUrls: ['./engages.component.scss']
})
export class EngagesComponent implements OnInit {
  siteLanguage = 'English';
  languageList =[
    {code: 'en', label:'English'},
    {code: 'ar', label:'Arabic'}
  ]
  constructor(private translate: TranslateService) { 
}


  ngOnInit(): void {
    
  }
  switchToAr(localeCode:string) { 
  //  const selectedLanguage = this.languageList
  //  .find((langauage)=> langauage.code === localeCode)
  //  ?.label.toString();
  //  if(selectedLanguage){
  //   this.siteLanguage = selectedLanguage;
  //   this.translate.use(localeCode);
  //  }
    // Get current URL
    //let currentUrl =  window.location.origin
    // Set Language to AR
    localStorage.setItem('lang',localeCode);
    // Set Language value 
    localStorage.setItem('langType','2');
    location.reload();
    //location.href = currentUrl+'/#/dashboard';    
  }
  switchToEn(localeCode:string) {  
  //   const selectedLanguage = this.languageList
  //  .find((langauage)=> langauage.code === localeCode)
  //  ?.label.toString();
  //  if(selectedLanguage){
  //   this.siteLanguage = selectedLanguage;
  //   this.translate.use(localeCode);
    // Get current URL
    let currentUrl =  window.location.origin
    // Set Language to EN
    localStorage.setItem('lang',localeCode);
    // Set Language value
    localStorage.setItem('langType','1');
    location.reload();
   // location.href = currentUrl+'/#/dashboard'; 
  }
}


