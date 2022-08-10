using API.DTOs.RefTable;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Servivces
{
    public interface IRefTableService
    {
        Task<IEnumerable<RefTableDto>> GetRefTableDataAsync();
    }
}
