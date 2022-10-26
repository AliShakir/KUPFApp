import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-html-forms',
  templateUrl: './html-forms.component.html',
  styleUrls: ['./html-forms.component.scss']
})
export class HtmlFormsComponent implements OnInit {
  //public Editor = ClassicEditor;
  englishHTML: any = '';
  arabicHtml: any = '';
  
  @Input() parentFormGroup:FormGroup;
  editorForm: FormGroup;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'yes',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    //toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };
  constructor() { }

//   public onReady(editor: any) {
//     editor.ui.getEditableElement().parentElement.insertBefore(
//         editor.ui.view.toolbar.element,
//         editor.ui.getEditableElement()
//     );
// }

  ngOnInit(): void { 
    this.initializeEditorForm();
    if (this.parentFormGroup) {
      this.parentFormGroup.setControl('editorForm', this.editorForm);
    }
  }
  initializeEditorForm() {
    this.editorForm = new FormGroup({
      englishHtml: new FormControl('', Validators.required),
      arabicHtml: new FormControl('', Validators.required),
      englishWebPageName: new FormControl('', Validators.required),
      arabicWebPageName: new FormControl('', Validators.required),
    })
  }
}
