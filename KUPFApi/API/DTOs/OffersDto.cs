using Microsoft.AspNetCore.Http;
using System;

namespace API.DTOs
{
    public class OffersDto
    {
        public int TenentId { get; set; }
        public int? ServiceId { get; set; }
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
        public IFormFile? File1 { get; set; }
        public string? OfferImage { get; set; }
        public string? OfferType { get; set; }
        public string? Offer { get; set; }
        public DateTime? OfferStartDate { get; set; }
        public DateTime? OfferEndDate { get; set; }
        public decimal? OfferAmount { get; set; }
    }
}
