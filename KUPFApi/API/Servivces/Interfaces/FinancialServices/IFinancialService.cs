using API.DTOs.FinancialServicesDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Servivces.Interfaces.FinancialServices
{
    public interface IFinancialService
    {
        Task<IEnumerable<ServiceTypeAndSubTypeIdsDto>> GetServiceTypeAndSubType();
    }
}
