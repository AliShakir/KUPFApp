import { FormTitleHd } from "./formTitleHd";

export interface FormTitleDt {
   
    tenentId: number;
    formTitleHdId: string;
    language: number;
    labelId: string;
    title: string;
    arabicTitle: string;
    rl: string;
    attiribute: string;
    remarks: string;
    status: string;
    formTitleHds: FormTitleHd;
}