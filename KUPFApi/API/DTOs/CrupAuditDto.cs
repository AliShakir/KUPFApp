using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CrupAuditDto
    {
        public long TenantId { get; set; }
        public int LocationId { get; set; }
        public long CrupId { get; set; }
        public int MySerial { get; set; }
        public int AuditNo { get; set; }
        public string AuditType { get; set; }
        public string TableName { get; set; }
        public string FieldName { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UpdateUserName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedUserName { get; set; }
    }
}
