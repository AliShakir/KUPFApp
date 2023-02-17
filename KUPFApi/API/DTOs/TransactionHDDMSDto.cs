using Microsoft.AspNetCore.Http;
using System;

namespace API.DTOs
{
    public class TransactionHDDMSDto
    {
        public int? TenentId { get; set; }
        public long? Mytransid { get; set; }
        public int? Serialno { get; set; }
        public int DocType { get; set; }
        public IFormFile Document { get; set; }
        public string AttachmentPath { get; set; }
        public string AttachmentByName { get; set; }

    }
}
