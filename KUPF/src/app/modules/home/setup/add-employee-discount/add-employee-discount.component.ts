import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/modules/_services/common.service';

@Component({
  selector: 'app-add-employee-discount',
  templateUrl: './add-employee-discount.component.html',
  styleUrls: ['./add-employee-discount.component.scss']
})
export class AddEmployeeDiscountComponent implements OnInit {

  formTitle:string;
  constructor(private common: CommonService) { }

  ngOnInit(): void {
    this.formTitle = this.common.getFormTitle();
    console.log(this.formTitle);
  }
}
