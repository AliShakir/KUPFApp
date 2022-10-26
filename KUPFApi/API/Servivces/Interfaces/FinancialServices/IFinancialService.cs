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
        Task<string> AddFinancialServiceAsync(TransactionHdDto transactionHdDto);
        Task<string> UpdateFinancialServiceAsync(TransactionHdDto transactionHdDto);
        Task<TransactionHdDto> GetFinancialServiceByIdAsync(long id);
        Task<IEnumerable<ReturnTransactionHdDto>> GetFinancialServiceAsync();
        Task<int> DeleteFinancialServiceAsync(long id);
        Task<ServiceSetupDto> GetServiceByServiceTypeAndSubType(int serviceType,int serviceSubType,int tenentId);
    }
}
