import { FormTitleDt } from "./formTitleDt";

export interface FormTitleHd {
    
    tenentId: number;
    language: number;
    formId: string;
    formName: string;
    headerName: string;
    subHeader: string;
    navigation: string;
    remarks: string;
    status: string;
    formTitleDts: FormTitleDt[];
}