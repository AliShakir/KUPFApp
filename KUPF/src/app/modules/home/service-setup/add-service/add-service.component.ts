import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/modules/_services/common.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  
  formTitle:string;
  constructor(private common: CommonService) { }

  ngOnInit(): void {
    this.formTitle = this.common.getFormTitle();
    
  }

}
