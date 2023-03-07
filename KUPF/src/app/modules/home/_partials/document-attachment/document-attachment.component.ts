import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { SelectServiceTypeDto } from 'src/app/modules/models/ServiceSetup/SelectServiceTypeDto';
import { DbCommonService } from 'src/app/modules/_services/db-common.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { JsonPipe } from '@angular/common';
export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-document-attachment',
  templateUrl: './document-attachment.component.html',
  styleUrls: ['./document-attachment.component.scss']
})
export class DocumentAttachmentComponent implements OnInit {
  @Input() parentFormGroup: FormGroup;
  @Input() documentAccordialDetails: string;
  documentAttachmentForm: FormArray<any>;
  selectDocTypeDto$: Observable<SelectServiceTypeDto[]>;
  documentForm: FormGroup;
  @Output() theAppplicationFileSelectEvent: EventEmitter<File> = new EventEmitter<File>();
  @Output() personalPhotoFileSelectEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() workIdFileSelectEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() civilIdFileSelectEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() salaryDataFileSelectEvent: EventEmitter<any> = new EventEmitter<any>();
  addOnBlur = true;
  visible = true;
  selectable = true;
  removable = true;

  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  metaTag: string[] = [];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  getForm!: FormGroup;
  @ViewChild('fruitInput', { static: false }) fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete!: MatAutocomplete;

  constructor(private fb: FormBuilder,
    private dbCommonService: DbCommonService) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
    map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  ngOnInit(): void {
    //Init document form.
    this.selectDocTypeDto$ = this.dbCommonService.GetDocTypes(21);
    //
    this.getFormdvalue();
  }

  onTheApplicationSelect(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.getForm?.get('appplicationFileDocument')?.setValue(file);
    }
  }
  onPersonalPhotoSelect(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.getForm?.get('personalPhotoDocument')?.setValue(file);
    }
  }
  onWorkIdSelect(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.getForm?.get('workIdDocument')?.setValue(file);
    }
  }
  onCivilIdSelect(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.getForm?.get('civilIdDocument')?.setValue(file);
    }
  }
  onSalaryDataSelect(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.getForm?.get('salaryDataDocument')?.setValue(file);
    }
  }
  // Initialize form
  metatagarr: any;
  



  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit

      if ((value || '').trim()) {
        this.metaTag.push(value.trim());
        JSON.stringify(this.metaTag);              
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.metaTag.indexOf(fruit);
    if (index >= 0) {
      this.metaTag.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.metaTag.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }


  getFormdvalue() {
    this.getForm = this.fb.group({
      subject: ['', Validators.required],
      attachmentRemarks: ['', Validators.required],
      
      appplicationFileDocType: ['',Validators.required],
      appplicationFileDocument: ['',Validators.required],
      
      civilIdDocType: ['',Validators.required],
      civilIdDocument: ['',Validators.required],

      workIdDocType: ['',Validators.required],
      workIdDocument: ['',Validators.required],

      personalPhotoDocType: ['',Validators.required],
      personalPhotoDocument: ['',Validators.required],

      salaryDataDocType: ['',Validators.required],
      salaryDataDocument: ['',Validators.required],
      mtag: ['', Validators.required]
    })
  }
 
  formVal() {
    console.log(this.metaTag);
    this.getForm.controls['mtag'].setValue(this.metaTag);
    console.log(this.getForm.controls['mtag'].value);
    console.log(this.getForm);
  }


}
