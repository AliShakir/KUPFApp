import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormTitleDt } from 'src/app/modules/models/formTitleDt';
import { FormTitleHd } from 'src/app/modules/models/formTitleHd';
import { LocalizationService } from 'src/app/modules/_services/localization.service';

@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.component.html',
  styleUrls: ['./search-tab.component.scss']
})
export class SearchTabComponent implements OnInit {
  /*********************/
formHeaderLabels$ :Observable<FormTitleHd[]>; 
formBodyLabels$ :Observable<FormTitleDt[]>; 
formBodyLabels :FormTitleDt[]=[]; 
id:string = '';
languageId:any;
// FormId to get form/App language
@ViewChild('SearchForm') hidden:ElementRef;
/*********************/
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];
  formTitle:string;
  closeResult: string = '';

  constructor(private cdr: ChangeDetectorRef,private modalService: NgbModal,private localizationService: LocalizationService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {}

  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',modalDialogClass:'modal-xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
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
      return  `with: ${reason}`;
    }
  }
  ngAfterViewInit() {
    // TO get the form id...
    this.id = this.hidden.nativeElement.value;
    
    // TO GET THE LANGUAGE ID
    this.languageId = localStorage.getItem('langType');
    
    //Get form header labels
    this.formHeaderLabels$ = this.localizationService.getFormHeaderLabels(this.id,this.languageId);
    
    //Get form body labels 
    this.formBodyLabels$= this.localizationService.getFormBodyLabels(this.id,this.languageId)
    
    //Get observable as normal array of items
    this.formBodyLabels$.subscribe((data)=>{
      this.formBodyLabels = data      
    },error=>{
      console.log(error);
    })
 }
}
