using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ApproveRejectServiceDto
    {
        public int TenentId { get; set; }
        public int LocationId { get; set; }
        public int UserId { get; set; }
        public long Mytransid { get; set; }        
        public DateTime? ApprovalDate { get; set; }
        public int? RejectionType { get; set; }
        public string RejectionRemarks { get; set; }      
        public string Userid { get; set; }
        public DateTime? Entrydate { get; set; }
        public DateTime? Entrytime { get; set; }
        public string ApprovalRemarks { get; set; }

    }
}
