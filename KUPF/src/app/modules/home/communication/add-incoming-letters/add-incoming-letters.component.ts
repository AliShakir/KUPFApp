import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IncommingCommunicationDto, SelectLetterTypeDTo, SelectPartyTypeDTo } from 'src/app/modules/models/CommunicationDto';
import { FormTitleDt } from 'src/app/modules/models/formTitleDt';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { CommunicationService } from 'src/app/modules/_services/communication.service';
import { DbCommonService } from 'src/app/modules/_services/db-common.service';
import { LocalizationService } from 'src/app/modules/_services/localization.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-incoming-letters',
  templateUrl: './add-incoming-letters.component.html',
  styleUrls: ['./add-incoming-letters.component.scss']
})
export class AddIncomingLettersComponent implements OnInit {
  inCommunicationForm: FormGroup;
  transId: number;
  employeeId: number
  isFormSubmitted=false;
  masterId: any;
  baseUrl = environment.KUPFApiUrl;

  incommingCommunicationDto$: Observable<any[]>;
 
  incommingCommunicationDto: IncommingCommunicationDto[];

// /*********************/
// formHeaderLabels$ :Observable<FormTitleHd[]>; 
// formBodyLabels$ :Observable<FormTitleDt[]>; 
// formBodyLabels :FormTitleDt[]=[]; 
// id:string = '';
// languageId:any;
// // FormId to get form/App language
// @ViewChild('AddIncomingLetters') hidden:ElementRef;
// /*********************/
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
  letterType$: Observable<SelectLetterTypeDTo[]>;
  partyType$: Observable<SelectPartyTypeDTo[]>;
  filledAt$: Observable<SelectPartyTypeDTo[]>;

  objIncommingCommunicationDto: IncommingCommunicationDto;
  constructor(private localizationService: LocalizationService,private commonDbService: DbCommonService,private fb: FormBuilder,
      private activatedRoute: ActivatedRoute,    private activatedRout: ActivatedRoute,
    private _communicationService: CommunicationService, private http: HttpClient,private toastr: ToastrService,) { 

      this.activatedRoute.queryParams.subscribe(params => {
        this.transId = params['mytransId'];
        this.employeeId = params['employeeId'];
      });


      this.masterId = this.activatedRout.snapshot.paramMap.get('mytransid');
      //this.objIncommingCommunicationDto = new  IncommingCommunicationDto();


    }

  ngOnInit(): void {
    //#region TO SETUP THE FORM LOCALIZATION    
    // TO GET THE LANGUAGE ID e.g. 1 = ENGLISH and 2 =  ARABIC
    this.languageType = localStorage.getItem('langType');

    // To get the selected language...
    this.language = localStorage.getItem('lang');

    // To setup the form id so will will get form labels based on form Id
    this.formId = 'AddIncomingLetters';

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

    this.initializeCommunicationDeliveryForm();
    this.letterType$ = this.commonDbService.getLetterType();
    this.partyType$ = this.commonDbService.getPartyType();
    this.filledAt$ = this.commonDbService.getFilledAtAsync();
    this.getIncommingCommunicationById();
  }
  ngAfterViewInit() {
    
    // // TO get the form id...
    // this.id = this.hidden.nativeElement.value;
    
    // // TO GET THE LANGUAGE ID
    // this.languageId = localStorage.getItem('langType');
    
    // // Get form header labels
    // this.formHeaderLabels$ = this.localizationService.getFormHeaderLabels(this.id,this.languageId);
    
    // // Get form body labels 
    // this.formBodyLabels$= this.localizationService.getFormBodyLabels(this.id,this.languageId)
    
    // // Get observable as normal array of items
    // this.formBodyLabels$.subscribe((data)=>{
    //   this.formBodyLabels = data   
    // },error=>{
    //   console.log(error);
    // })
  }


  initializeCommunicationDeliveryForm() {
    this.inCommunicationForm = this.fb.group({
      //totalAmount: new FormControl('0'),
      letterType: new FormControl('',Validators.required),
      partyType: new FormControl('',Validators.required),
      filledAt:new FormControl('',Validators.required),

      // draftNumber1: new FormControl('0'),
      // draftDate1: new FormControl(null),
      // receivedBy1: new FormControl(''),
      // receivedDate1: new FormControl(null),
      // deliveredBy1: new FormControl(),
      // pfid: new FormControl(),
      // empCidNum: new FormControl(),
      // employeeId: new FormControl(),
      // arabicName: new FormControl(),
      // englishName: new FormControl(),
      // deliveryDate1: new FormControl(null),
      // transId:new FormControl('')
    })
  }


  getIncommingCommunicationById()
  {
 
    if(this.masterId !=null && this.masterId !=undefined)
    {
      var resp= this._communicationService.getIncommingCommunicationById(Number(this.masterId) );
      //this._communicationService.getIncommingCommunicationById(Number(this.masterId) );
 
    }
 
  } 



  addIncommingCommunication() {

   // const finalformData = new FormData(); 
 {
      this.http.post(this.baseUrl + `Communication/addIncommingCommunication`, this.inCommunicationForm).subscribe({
        next: () => {
          //this.toastr.success('Saved successfully', 'Success');
          //this.parentForm.reset();
          //this.parentForm.get('addServiceSetupForm')?.patchValue({
          //  allowDiscountPer: '',
          // allowDiscountAmount: '0.0',
            //serviceId: ''
        //  });
          
        },
        error: (error) => {
          if (error.status === 500) {
            this.toastr.error('Duplicate value found', 'Error');
          }
        }
      });
    }  
  }

  
}
