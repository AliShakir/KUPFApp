import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/modules/_services/common.service';

@Component({
  selector: 'app-add-employee-moment',
  templateUrl: './add-employee-moment.component.html',
  styleUrls: ['./add-employee-moment.component.scss']
})
export class AddEmployeeMomentComponent implements OnInit {

  formTitle:string;
  constructor(private common: CommonService) { }

  ngOnInit(): void {
    this.formTitle = this.common.getFormTitle();
    console.log(this.formTitle);
  }

}
