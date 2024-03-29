import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { observable, Observable } from 'rxjs';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { OffersDto } from 'src/app/modules/models/OffersDto';
import { SelectServiceTypeDto } from 'src/app/modules/models/ServiceSetup/SelectServiceTypeDto';
import { CommonService } from 'src/app/modules/_services/common.service';
import { DbCommonService } from 'src/app/modules/_services/db-common.service';
import { OffersService } from 'src/app/modules/_services/offers.service';
import { environment } from 'src/environments/environment';
import { HtmlFormsComponent } from '../../_partials/html-forms/html-forms.component';

@Component({
  selector: 'app-special-offer-maintenace',
  templateUrl: './special-offer-maintenace.component.html',
  styleUrls: ['./special-offer-maintenace.component.scss']
})
export class SpecialOfferMaintenaceComponent implements OnInit {
  //#region
  // 
  columnsToDisplay: string[] = ['action','offerName', 'offerTypeName', 'offerStart', 'offerEnd', 'offerAmount'];
  //
  offers$: Observable<OffersDto[]>;

  // We need a normal array of data so we will subscribe to the observable and will get data
  offers: MatTableDataSource<OffersDto> = new MatTableDataSource<any>([]);

  // Paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Sorting
  @ViewChild(MatSort) sort!: MatSort;

  // Hide footer while loading.
  isLoadingCompleted: boolean = false;

  // Incase of any error will display error message.
  dataLoadingStatus: string = '';

  // True of any error
  isError: boolean = false;

  // formGroup
  formGroup: FormGroup;

  // Search Term
  searchTerm: string = '';
  //#endregion

  //#region 
  /*----------------------------------------------------*/

  // Language Type e.g. 1 = ENGLISH and 2 =  ARABIC
  languageType: any;

  // Selected Language
  language: any;

  // We will get form lables from lcale storage and will put into array.
  AppFormLabels: FormTitleHd[] = [];

  // We will filter form header labels array
  formHeaderLabels: any[] = [];

  // We will filter form body labels array
  formBodyLabels: any[] = [];

  // FormId
  formId: string;

  /*----------------------------------------------------*/
  //#endregion
  @ViewChild(HtmlFormsComponent) htmlForm: any;
  //
  parentForm: FormGroup;
  //
  offerForm: FormGroup;
  offersArray = [
    { id: 1, name: 'ConsumerLoanType' },
    { id: 2, name: 'Department' },
    { id: 3, name: 'DocType' },
    { id: 4, name: 'EmplContract' },
    { id: 5, name: 'FilingPlace' },
    { id: 6, name: 'FilingTag' },
    { id: 7, name: 'Occupation' },
  ];
  offerImage: File;
  attachment1: File;
  attachment2: File;

  // Modal close result...
  closeResult = '';
  // Getting base URL of Api from enviroment.
  baseUrl = environment.KUPFApiUrl;
  electronicFile1: File;
  electronicFile2: File;
  isFormSubmitted = false;
  // 
  offerType$: Observable<SelectServiceTypeDto[]>;

  constructor(private fb: FormBuilder,
    private offersService: OffersService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private commonService: CommonService,
    private dbCommonService:DbCommonService) {
    this.formGroup = new FormGroup({
      searchTerm: new FormControl(null)
    })
    this.setUpParentForm();
    
  }

  ngOnInit(): void {
    //#region TO SETUP THE FORM LOCALIZATION    
    // TO GET THE LANGUAGE ID e.g. 1 = ENGLISH and 2 =  ARABIC
    this.languageType = localStorage.getItem('langType');

    // To get the selected language...
    this.language = localStorage.getItem('lang');

    // To setup the form id so will will get form labels based on form Id
    this.formId = 'OfferDetails';

    // Check if LocalStorage is Not NULL
    if (localStorage.getItem('AppLabels') != null) {

      // Get data from LocalStorage
      this.AppFormLabels = JSON.parse(localStorage.getItem('AppLabels') || '{}');

      for (let labels of this.AppFormLabels) {

        if (labels.formID == this.formId && labels.language == this.languageType) {

          this.formHeaderLabels.push(labels);

          this.formBodyLabels.push(labels.formTitleDTLanguage);

        }
      }
    }
    //#endregion
    //
    this.initOfferForm();
    //
    this.LoadData();
    //
    this.offerType$ = this.dbCommonService.GetOffers();
  }
  setUpParentForm() {
    this.parentForm = this.fb.group({});
  }
  initOfferForm() {
    this.offerForm = this.fb.group({
      offerType: new FormControl('', Validators.required),
      offerStartDate: new FormControl('', Validators.required),
      offerEndDate: new FormControl('', Validators.required),
      offerAmount: new FormControl('', Validators.required),
      serviceId: new FormControl(0),
      offerImage: new FormControl('', Validators.required),
      offerTypeName: new FormControl(''),
      offerName: new FormControl('', Validators.required)
    })
    this.parentForm.setControl('offerForm', this.offerForm);
  }
  get _offerForm() { return this.offerForm.controls; }
  onOfferFormSubmit() {
    // Get Tenant Id
    var data = JSON.parse(localStorage.getItem("user")!);
    const tenantId = data.map((obj: { tenantId: any; }) => obj.tenantId);
    const locationId = data.map((obj: { locationId: any; }) => obj.locationId);
    const username = data.map((obj: { username: any; }) => obj.username);

    this.isFormSubmitted = true;
    let formData = {
      ...this.parentForm.value.offerForm,
      ...this.parentForm.value.editorForm,
      tenentID: tenantId
    }
   
    const finalformData = new FormData();
    finalformData.append('File1', this.offerImage);

    finalformData.append('ElectronicForm1Attachment', this.commonService.attachment1);
    finalformData.append('ElectronicForm2Attachment', this.commonService.attachment2);

    var startDate = this.offerForm.controls['offerStartDate'].value;
    var offerStartDate = (new Date(startDate)).toISOString();
    finalformData.append("offerStartDate", offerStartDate);

    var endDate = this.offerForm.controls['offerEndDate'].value;
    var offerEndDate = (new Date(endDate)).toISOString();
    finalformData.append("offerEndDate", offerEndDate);

    finalformData.set("tenentId", formData.tenentID);

    Object.keys(formData).forEach(key => finalformData.append(key, formData[key]));
    if (this.offerForm.controls['serviceId'].value === '' || this.offerForm.controls['serviceId'].value === 0) {
      this.offersService.AddOffer(finalformData).subscribe({
        next: () => {
          this.toastrService.success('Saved successfully', 'Success');
          this.LoadData();
          this.parentForm.reset();
          this.offerFile = "";
          this.htmlForm.clearFileChooser();
        },
        error: (error) => {
          if (error.status === 500) {
            this.toastrService.error('Duplicate value found', 'Error');
          }
        }
      })
      
    }
    else {
      this.offersService.UpdateOffer(finalformData).subscribe({
        next: () => {
          this.toastrService.success('Updated successfully', 'Success');
          this.LoadData();
          this.parentForm.reset();
          this.offerFile = "";
          this.htmlForm.clearFileChooser();
        },
        error: (error) => {
          if (error.status === 500) {
            this.toastrService.error('Duplicate value found', 'Error');
          }
        }
      })
    }

  }
  offerFile:any;
  electricform1:any;
  electricform2:any;
  editData(serviceId: any) {
    if(this.offerFile!=undefined){
      this.offerFile="";
    } 
    // if(this.commonService.attachment1!=undefined){
    //   //this.commonService.attachment1="";
    // }
    if(this.electricform2!=undefined){
      this.electricform2="";
    }
    this.offersService.GetOfferById(serviceId).subscribe((response: any) => {  
      this.commonService.ecform1=response.electronicForm1;
      this.commonService.ecform2=response.electronicForm2;
      console.log(response); 
      this.parentForm.patchValue({
          offerForm: {
            offerType: +response.offerType,
            offerStartDate: response.offerStartDate ? new Date(response.offerStartDate) : '',
            offerEndDate: response.offerEndDate ? new Date(response.offerEndDate) : '',
            offerAmount: response.offerAmount,
            offerImage: response.offerImage,
            serviceId: response.serviceId,
            electronicForm1: response.electronicForm1,
            electronicForm2: response.electronicForm2,
            electronicForm1URL: response.electronicForm1URL,
            electronicForm2URL: response.electronicForm2URL,
            offerName: response.offerName
          },
          editorForm:{
            englishHtml:response.englishHTML,
            arabicHtml:response.arabicHTML,
            englishWebPageName:response.englishWebPageName,
            arabicWebPageName:response.arabicWebPageName,
            electronicForm1: response.electronicForm1,
            electronicForm1URL: response.electronicForm1URL,
            electronicForm2: response.electronicForm2,
            electronicForm2URL: response.electronicForm2URL,
            webEnglish:response.webEnglish,
            webArabic:response.webArabic             
          }
      })  
      this.offerFile=response.offerImage;
      this.commonService.attachment1=response.electronicForm1;
      this.electricform2=response.electronicForm2;
      console.log('Editor Form',this.commonService.attachment1)
     
    })
    
  }
  resetForm() {
    this.offerForm.reset();
  }
  // On file Select

  onOfferFileSelectChange(event: any) {   
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.offerImage = file;
      this.offerFile=this.offerImage.name;
    }
  }
  // onElectronicForm1Select(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.electricform1 = file;
  //     this.electricform1=file.name;
  //   }
  // }
  // onElectronicForm2Select(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.electricform2 = file;
  //     this.electricform2=file.name;
  //   }
  // }
  onOfferTypeChange($event: any) {   
    this.offerForm.patchValue({
      offerTypeName :$event.shortname      
    })    
  }

  LoadData() {
    this.offers$ = this.offersService.GetOffers();
    this.offers$.subscribe((response: OffersDto[]) => {
      this.offers = new MatTableDataSource<OffersDto>(response);
      this.offers.paginator = this.paginator;
      this.offers.sort = this.sort;
      this.isLoadingCompleted = true;
    }, error => {
      this.dataLoadingStatus = 'Error fetching the data';
      this.isError = true;
    })

  }
  //#region 
  // Delete recored...
  open(content: any, id: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.offersService.DeleteOffer(id).subscribe(
          res => {
            this.toastrService.success('Deleted Successfully', 'Deleted')
          },
          error => {
            console.log(error);
          }, () => {
            // TO REFRESH / RELOAD THE PAGE WITHOUT REFRESH THE WHOLE PAGE.
            this.LoadData();
          })
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  //#endregion
  //#region Material Search and Clear Filter
  filterRecords() {
    if (this.formGroup.value.searchTerm != null && this.offers) {
      this.offers.filter = this.formGroup.value.searchTerm.trim();
    }
  }
  clearFilter() {
    this.formGroup?.patchValue({ searchTerm: "" });
    this.filterRecords();
  }
  //#endregion
}
