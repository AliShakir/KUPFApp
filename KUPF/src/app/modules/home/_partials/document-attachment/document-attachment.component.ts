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
    this.initDocumentAttachments();
    this.selectDocTypeDto$ = this.dbCommonService.GetDocTypes(21);
    //
    if (this.parentFormGroup) {      
      this.parentFormGroup.setControl('documentAttachmentForm', this.documentAttachmentForm);
    }
  }

  onTheApplicationSelect(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.documentAttachmentForm?.controls[0].get('Document')?.setValue(file);
    }
  }
  onPersonalPhotoSelect(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.documentAttachmentForm?.controls[1].get('Document')?.setValue(file);
    }
  }
  onWorkIdSelect(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.documentAttachmentForm?.controls[2].get('Document')?.setValue(file);
    }
  }
  onCivilIdSelect(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.documentAttachmentForm?.controls[3].get('Document')?.setValue(file);
    }
  }
  onSalaryDataSelect(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.documentAttachmentForm?.controls[4].get('Document')?.setValue(file);
    }
  }
  // Initialize form
  metatagarr:any;
  initDocumentAttachments() {
    
    this.documentAttachmentForm = new FormArray<any>([]);
    this.documentAttachmentForm.push(
      new FormGroup({
        docType: new FormControl('', Validators.required),
        Document: new FormControl('', Validators.required),
        subject: new FormControl('', Validators.required),
        metaTag: new FormControl([this.metaTag], Validators.required),
        attachmentRemarks: new FormControl('', Validators.required)
      }));
    this.documentAttachmentForm.push(
      new FormGroup({
        docType: new FormControl('', Validators.required),
        Document: new FormControl('', Validators.required),
        subject: new FormControl('', Validators.required),
        metaTag: new FormControl([this.metaTag], Validators.required),
        attachmentRemarks: new FormControl('', Validators.required)
      }));
    this.documentAttachmentForm.push(
      new FormGroup({
        docType: new FormControl('', Validators.required),
        Document: new FormControl('', Validators.required),
        subject: new FormControl('', Validators.required),
        metaTag: new FormControl('', Validators.required),
        attachmentRemarks: new FormControl('', Validators.required)
      }));
    this.documentAttachmentForm.push(
      new FormGroup({
        docType: new FormControl('', Validators.required),
        Document: new FormControl('', Validators.required),
        subject: new FormControl('', Validators.required),
        metaTag: new FormControl('', Validators.required),
        attachmentRemarks: new FormControl('', Validators.required)
      }));
    this.documentAttachmentForm.push(
      new FormGroup({
        docType: new FormControl('', Validators.required),
        Document: new FormControl('', Validators.required),
        subject: new FormControl('', Validators.required),
        metaTag: new FormControl('', Validators.required),
        attachmentRemarks: new FormControl('', Validators.required)
      }));

  }



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
        
        // this.metatagarr= this.metaTag;
        //     console.log(this.metatagarr)
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
}
