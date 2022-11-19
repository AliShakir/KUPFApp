using API.DTOs;
using API.DTOs.DropDown;
using API.DTOs.FinancialServicesDto;
using API.DTOs.RefTable;
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
        Task<ReturnSingleFinancialServiceById> GetFinancialServiceByIdAsync(long id);
        Task<IEnumerable<ReturnTransactionHdDto>> GetFinancialServiceAsync();
        Task<int> DeleteFinancialServiceAsync(long id);
        Task<ServiceSetupDto> GetServiceByServiceTypeAndSubType(int serviceType,int serviceSubType,int tenentId);
        Task<IEnumerable<ReturnServiceApprovals>> GetServiceApprovalsAsync();

        Task<string> ApproveServiceAsync(ApproveRejectServiceDto approveRejectServiceDto);

        Task<IEnumerable<RefTableDto>> GetRejectionType();
        Task<string> RejectServiceAsync(ApproveRejectServiceDto approveRejectServiceDto);
        Task<IEnumerable<ReturnServiceApprovals>> GetServiceApprovalsByEmployeeId(string employeeId);
        Task<IEnumerable<ReturnServiceApprovalDetails>> GetServiceApprovalDetailByTransId(int transId);
        Task<IEnumerable<SelectServiceTypeDto>> GetServiceType(int tenentId);

        Task<int> MakeFinancialTransactionAsync(CostCenterDto costCenterDto);

    }
}
