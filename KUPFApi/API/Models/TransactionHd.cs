using System;
using System.Collections.Generic;

#nullable disable

namespace API.Models
{
    public partial class TransactionHd
    {
        public int TenentId { get; set; }
        public long Mytransid { get; set; }
        public int? LocationId { get; set; }
        public int? EmployeeId { get; set; }
        public int? ServiceId { get; set; }
        public int? MasterServiceId { get; set; }
        public decimal? ServiceType { get; set; }
        public decimal? ServiceSubType { get; set; }
        public string Source { get; set; }
        public int? AttachId { get; set; }
        public string TransDocNo { get; set; }
        public long? BankId { get; set; }
        public string ChequeNumber { get; set; }
        public DateTime? ChequeDate { get; set; }
        public decimal? ChequeAmount { get; set; }
        public decimal? Totinstallments { get; set; }
        public decimal? Totamt { get; set; }
        public decimal? AmtPaid { get; set; }
        public string LoanAct { get; set; }
        public string HajjAct { get; set; }
        public string PersLoanAct { get; set; }
        public string ConsumerLoanAct { get; set; }
        public string OtherAct1 { get; set; }
        public string OtherAct2 { get; set; }
        public string OtherAct3 { get; set; }
        public string OtherAct4 { get; set; }
        public string OtherAct5 { get; set; }

        public string? SerApproval1 { get; set; }
        public string? ApprovalBy1 { get; set; }
        public DateTime? ApprovedDate1 { get; set; }
        public string? SerApproval2 { get; set; }
        public string? ApprovalBy2 { get; set; }
        public DateTime? ApprovedDate2 { get; set; }
        public string? SerApproval3 { get; set; }
        public string? ApprovalBy3 { get; set; }
        public DateTime? ApprovedDate3 { get; set; }
        public string? SerApproval4 { get; set; }
        public string? ApprovalBy4 { get; set; }
        public DateTime? ApprovedDate4 { get; set; }
        public string? SerApproval5 { get; set; }
        public string? ApprovalBy5 { get; set; }
        public DateTime? ApprovedDate5 { get; set; }
        public string Activitycode { get; set; }
        public decimal? Mydocno { get; set; }
        public string Userbatchno { get; set; }
        public string Projectno { get; set; }
        public DateTime Transdate { get; set; }
        public string Reference { get; set; }
        public string Notes { get; set; }
        public string Glpostref { get; set; }
        public string Glpostref1 { get; set; }
        public int? Companyid { get; set; }
        public decimal? Discount { get; set; }
        public int? Terms { get; set; }
        public int? RefTransId { get; set; }
        public string Signatures { get; set; }
        public string ExtraSwitch1 { get; set; }
        public string ExtraSwitch2 { get; set; }
        public string Status { get; set; }
        public long? CrupId { get; set; }
        public string Userid { get; set; }
        public bool? Active { get; set; }
        public DateTime? Entrydate { get; set; }
        public DateTime? Entrytime { get; set; }
        public DateTime? Updttime { get; set; }
        public decimal? InstallmentAmount { get; set; }
        public DateTime InstallmentsBegDate { get; set; }
        public string UntilMonth { get; set; }


    }
}
