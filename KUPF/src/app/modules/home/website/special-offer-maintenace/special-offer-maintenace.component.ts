import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { OffersDto } from 'src/app/modules/models/OffersDto';
import { OffersService } from 'src/app/modules/_services/offers.service';

@Component({
  selector: 'app-special-offer-maintenace',
  templateUrl: './special-offer-maintenace.component.html',
  styleUrls: ['./special-offer-maintenace.component.scss']
})
export class SpecialOfferMaintenaceComponent implements OnInit {
//#region
  // 
  columnsToDisplay: string[] = ['action', 'offerType', 'offerStart', 'offerEnd', 'offerAmount'];
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
  constructor(private fb: FormBuilder,private offersService: OffersService) {
    this.formGroup = new FormGroup({
      searchTerm: new FormControl(null)
    })
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
  }
  onOfferFormSubmit(){
    //this.isFormSubmitted = true;
    console.log(this.offerForm.value);
  }
  resetForm(){
    this.offerForm.reset();
  }
  initOfferForm(){
    this.offerForm = this.fb.group({
      offerImage: new FormControl(''),
      offerType: new FormControl('', Validators.required),
      offerStart: new FormControl('', Validators.required),
      offerEnd: new FormControl('', Validators.required),
      offerAmount: new FormControl('', Validators.required)
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
      console.log(error);
      this.dataLoadingStatus = 'Error fetching the data';
      this.isError = true;
    })
  }
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
