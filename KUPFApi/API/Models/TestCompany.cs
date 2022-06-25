using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class TestCompany
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<TestEmployee> Employees { get; set; }
    }
}