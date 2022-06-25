using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class TestEmployee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public TestCompany Company { get; set; }
    }
}