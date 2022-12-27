using System;

namespace API.DTOs
{
    public class ReturnApprovalDetailsDto
    {
      
        public string? ServiceType { get; set; }
        public string? ServiceSubType { get; set; }        
        public decimal? Totamt { get; set; }
    }
}
