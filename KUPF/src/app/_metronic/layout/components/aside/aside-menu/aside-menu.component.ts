import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuHeading } from 'src/app/modules/models/MenuHeading';
import { UserFunctionDto } from 'src/app/modules/models/UserFunctions/UserFunctionDto';
import { CommonService } from 'src/app/modules/_services/common.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
  appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;

  @Output() dataEvent = new EventEmitter<string>();
  //
  menuHeading: any[] = [];
  constructor(private common: CommonService, private router: Router) { }

  ngOnInit(): void {
    //
    console.log('hello from aside menu');
    //if(localStorage.getItem('userMenu') == null){ 
    //localStorage.removeItem('userMenu');     
    this.menuHeading = JSON.parse(localStorage.getItem('userMenu') || '{}');
    console.log('aside-menu', this.menuHeading);
    
    
    // for (let i = 0; i < this.menuHeading.length; i++) {

    //   for (let x = 0; x < this.menuHeading[i].listMenuHeadingDto.length; x++) {

    //     console.log(x,this.menuHeading[i].listMenuHeadingDto[x].headingNameEnglish);
        
    //     for(let y = 0; y < this.menuHeading[i].listMenuHeadingDto[i].menuItems.length; y++){

    //       //console.log(y);
    //       console.log(y,this.menuHeading[i].listMenuHeadingDto[x].menuItems[y].menuItemNameEnglish);
    //     }
    //   }
    // }
    // }else{


    // }
  }


  openRequestForDiscountForm(title: string) {
    this.common.sendFormTitle(title);
    this.redirectTo('/service-setup/add-service');
  }

  // Manually redirect to URL to dynamicall change title of form
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
