﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.FinancialTransaction
{
    public class AccountRequest : RequestParamters
    {
        public int AccountID { get; set; }
        public string AccountName { get; set; }
        public string ArabicAccountName { get; set; }
        public int AccountTypeID { get; set; }
        public int UserID { get; set; }
        public DateTime ActivityDateTime { get; set; }
    }
}
