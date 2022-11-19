﻿using API.DTOs;
using API.DTOs.FinancialTransaction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Servivces.Interfaces
{
    public interface IFinancialTransactionService
    {
        Response SaveCOA(AccountRequest Req);
        Response SaveVoucher(VoucherRequest Re);
        Response GetAccountByType(COARequest Req);
        Response GetCostCenters(RequestParamters Req);
        Response CashVoucher(CashRequest Req);
    }
}
