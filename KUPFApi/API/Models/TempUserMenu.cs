using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class TempUserMenu
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MenuId { get; set; }
        public int ChildId { get; set; }
        public int GrandChildId { get; set; }
        public string MenuNameEnglish { get; set; }
        public string MenuNameArabic { get; set; }
    }
}
