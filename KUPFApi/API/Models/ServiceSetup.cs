using System;
using System.Collections.Generic;

#nullable disable

namespace API.Models
{
    public partial class ServiceSetup
    {
        public int TenentId { get; set; }
        public int ServiceId { get; set; }
        public string MasterServiceId { get; set; }
        public int SerIdbyUser { get; set; }
        public string ServiceName1 { get; set; }
        public string ServiceName2 { get; set; }
        public int? ServiceType { get; set; }
        public int? ServiceSubType { get; set; }
        public int? AllowSponser { get; set; }
        public string AllowedNonEmployes { get; set; }
        public int? MinMonthsService { get; set; }
        public int? MinInstallment { get; set; }
        public int? MaxInstallment { get; set; }
        public string Frozen { get; set; }
        public string PreviousEmployees { get; set; }
        public string SerApproval1 { get; set; }
        public string SerApproval2 { get; set; }
        public string SerApproval3 { get; set; }
        public string SerApproval4 { get; set; }
        public string SerApproval5 { get; set; }
        public string FinalApproval { get; set; }
        public string Remarks { get; set; }
        public string Keyword { get; set; }
        public string LoanAct { get; set; }
        public string HajjAct { get; set; }
        public string PersLoanAct { get; set; }
        public string ConsumerLoanAct { get; set; }
        public string OtherAct1 { get; set; }
        public string OtherAct2 { get; set; }
        public string OtherAct3 { get; set; }
        public string OtherAct4 { get; set; }
        public short? SortBy { get; set; }
        public string Active { get; set; }
        public long? CrupId { get; set; }
        public string Userid { get; set; }
        public DateTime? Entrydate { get; set; }
        public DateTime? Entrytime { get; set; }
        public DateTime? Updttime { get; set; }
        public DateTime? UploadDate { get; set; }
        public string Uploadby { get; set; }
        public DateTime? SyncDate { get; set; }
        public string Syncby { get; set; }
        public int? SynId { get; set; }
    }
}
