import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/modules/_services/common.service';

@Component({
  selector: 'app-service-setup-details',
  templateUrl: './service-setup-details.component.html',
  styleUrls: ['./service-setup-details.component.scss']
})
export class ServiceSetupDetailsComponent implements OnInit {

  formTitle:string;
  constructor(private common: CommonService) { }

  ngOnInit(): void {
    this.formTitle = this.common.getFormTitle();
    this.formTitle = '';
  }
}
