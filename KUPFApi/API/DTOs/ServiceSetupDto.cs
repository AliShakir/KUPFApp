﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ServiceSetupDto
    {
        public int TenentId { get; set; }
        public int? ServiceId { get; set; }
        public string MasterServiceId { get; set; }
        public int SerIdbyUser { get; set; }
        public string ServiceName1 { get; set; }
        public string ServiceName2 { get; set; }
        public int? ServiceType { get; set; }
        public string? ServiceTypeName { get; set; }
        public int? ServiceSubType { get; set; }
        public int? AllowSponser { get; set; }
        public bool? AllowedNonEmployes { get; set; }
        public int? MinMonthsService { get; set; }
        public int? MinInstallment { get; set; }
        public int? MaxInstallment { get; set; }
        public bool? Frozen { get; set; }
        public bool? PreviousEmployees { get; set; }
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
        public string OtherAct5 { get; set; }
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
        public bool? AllowDiscountPer { get; set; }
        public decimal? AllowDiscountAmount { get; set; }
        public bool? AllowDiscountDefault { get; set; }
        public string? EnglishHTML { get; set; }
        public string? EnglishWebPageName { get; set; }
        public string? ArabicHTML { get; set; }
        public string? ArabicWebPageName { get; set; }
        public string? ElectronicForm1 { get; set; }
        public string? ElectronicForm1URL { get; set; }
        public string? ElectronicForm2 { get; set; }
        public string? ElectronicForm2URL { get; set; }
        public IFormFile? File1 { get; set; }
        public IFormFile? File2 { get; set; }
    }
}