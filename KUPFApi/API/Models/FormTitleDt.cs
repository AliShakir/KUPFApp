﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace API.Models
{
    public partial class FormTitleDt
    { 
        public int TenentId { get; set; }
        public string FormTitleHdId { get; set; }
        public int Language { get; set; }
        [Key]
        public string LabelId { get; set; }
        public string Title { get; set; }
        public string ArabicTitle { get; set; }
        public string Rl { get; set; }
        public string Attiribute { get; set; }
        public string Remarks { get; set; }
        public string Status { get; set; }
        
        
    }
}
