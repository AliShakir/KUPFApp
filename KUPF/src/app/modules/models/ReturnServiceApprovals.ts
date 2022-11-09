export interface ReturnServiceApprovals {
    myTransId: number;
    employeeId: number;
    englishName: string;
    arabicName: string;
    services?: any;
    source: string;
    totalInstallments: number;
    amount: number;
    discounted?: any;
    installmentBeginDate: Date;
    untilMonth: string;
}