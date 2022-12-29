import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectServiceTypeDto } from 'src/app/modules/models/ServiceSetup/SelectServiceTypeDto';
import { DbCommonService } from 'src/app/modules/_services/db-common.service';


@Component({
  selector: 'app-document-attachment',
  templateUrl: './document-attachment.component.html',
  styleUrls: ['./document-attachment.component.scss']
})
export class DocumentAttachmentComponent implements OnInit {
  @Input() parentFormGroup: FormGroup;
  documentAttachmentForm: FormArray<any>;
  selectDocTypeDto$: Observable<SelectServiceTypeDto[]>;

  @Output() theAppplicationFileSelectEvent: EventEmitter<File> = new EventEmitter<File>();
  @Output() personalPhotoFileSelectEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() workIdFileSelectEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() civilIdFileSelectEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() salaryDataFileSelectEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    private dbCommonService: DbCommonService) { }

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
  initDocumentAttachments() {
    this.documentAttachmentForm = new FormArray<any>([]);
    this.documentAttachmentForm.push(
      new FormGroup({        
        docType: new FormControl('', Validators.required),
        Document: new FormControl('', Validators.required)
      }));
    this.documentAttachmentForm.push(
      new FormGroup({        
        docType: new FormControl('', Validators.required),
        Document: new FormControl('', Validators.required)
      }));
    this.documentAttachmentForm.push(
      new FormGroup({
        docType: new FormControl('', Validators.required),
        Document: new FormControl('', Validators.required)
      }));
    this.documentAttachmentForm.push(
      new FormGroup({
        docType: new FormControl('', Validators.required),
        Document: new FormControl('', Validators.required)
      }));
    this.documentAttachmentForm.push(
      new FormGroup({
        docType: new FormControl('', Validators.required),
        Document: new FormControl('', Validators.required)
      }));

  }
}
