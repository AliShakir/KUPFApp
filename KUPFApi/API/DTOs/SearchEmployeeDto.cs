using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class SearchEmployeeDto
    {
        public string? EmployeeId { get; set; }
        public string? PFId { get; set; }
        public string? CID { get; set; }
    }
}
