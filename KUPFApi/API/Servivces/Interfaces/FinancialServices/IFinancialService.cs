using API.DTOs;
using API.DTOs.FinancialServicesDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Servivces.Interfaces.FinancialServices
{
    public interface IFinancialService
    {
        Task<ServiceSetupDto> GetServiceByServiceTypeAndSubType(int serviceType,int serviceSubType,int tenentId);
    }
}
