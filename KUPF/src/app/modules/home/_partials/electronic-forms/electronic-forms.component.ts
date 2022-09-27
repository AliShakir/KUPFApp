import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-electronic-forms',
  templateUrl: './electronic-forms.component.html',
  styleUrls: ['./electronic-forms.component.scss']
})
export class ElectronicFormsComponent implements OnInit {

  @Input() parentFormGroup:FormGroup;
  electronicForm: FormGroup | undefined;

  constructor() { }

  ngOnInit(): void {
    this.initializeElectronicForm();
    if (this.parentFormGroup) {
      this.parentFormGroup.setControl('electronicForm', this.electronicForm);
    }
  }
initializeElectronicForm() {
    this.electronicForm = new FormGroup({
      electronicForm1: new FormControl('', Validators.required),
      electronicForm1URL: new FormControl('', Validators.required),
      electronicForm2: new FormControl('', Validators.required),
      electronicForm2URL: new FormControl('', Validators.required),
    })
  }
}
