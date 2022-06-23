using System;
using System.Collections.Generic;

#nullable disable

namespace API.Models
{
    public partial class FormTitleHd
    {
        public int TenentId { get; set; }
        public int Language { get; set; }
        public string FormId { get; set; }
        public string FormName { get; set; }
        public string HeaderName { get; set; }
        public string SubHeader { get; set; }
        public string Navigation { get; set; }
        public string Remarks { get; set; }
        public string Status { get; set; }
        //public virtual ICollection<FormTitleHd> FormTitleHd { get; set; } // Must be collection
    }
}
