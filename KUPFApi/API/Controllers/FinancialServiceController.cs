using API.DTOs;
using API.DTOs.DropDown;
using API.DTOs.FinancialServicesDto;
using API.DTOs.RefTable;
using API.Models;
using API.Servivces.Interfaces.FinancialServices;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinancialServiceController : ControllerBase
    {
        private readonly KUPFDbContext _context;
        private readonly IFinancialService _financialService;
        public IMapper _mapper;
        public FinancialServiceController(KUPFDbContext context, IFinancialService financialService, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _financialService = financialService;
        }
        [HttpPost]
        [Route("AddFinancialService")]
        public async Task<ActionResult<string>> AddFinancialService(TransactionHdDto transactionHdDto)
        {
            await _financialService.AddFinancialServiceAsync(transactionHdDto);
            await _context.SaveChangesAsync();
            return transactionHdDto.Mytransid.ToString();
        }
        
        [HttpPut]
        [Route("UpdateFinancialService")]
        public async Task<ActionResult<string>> UpdateFinancialService(TransactionHdDto transactionHdDto)
        {
            if (transactionHdDto != null)
            {
                var result = await _financialService.UpdateFinancialServiceAsync(transactionHdDto);
                return result;
            }
            return null;
        }
        
        [HttpGet]
        [Route("GetFinancialServiceById")]
        public async Task<ReturnSingleFinancialServiceById> GetFinancialServiceById(long transId)
        {
            if (transId != 0)
            {
                var result = await _financialService.GetFinancialServiceByIdAsync(transId);
                return result;
            }
            return null;
        }
        
        [HttpGet]
        [Route("GetFinancialServices")]
        public async Task<IEnumerable<ReturnTransactionHdDto>> GetEmployees()
        {
            var result = await _financialService.GetFinancialServiceAsync();
            return result;
        }
        
        [HttpDelete]
        [Route("DeleteFinancialService")]
        public async Task<int> DeleteFinancialService(long transId)
        {
            int result = 0;
            if (transId != 0)
            {
                result = await _financialService.DeleteFinancialServiceAsync(transId);
            }

            return result;
        }



        [HttpGet]
        [Route("GetServiceByServiceTypeAndSubType/{serviceType}/{serviceSubType}/{tenentId}")]
        public async Task<ServiceSetupDto> GetServiceTypeAndSubType(int serviceType, int serviceSubType, int tenentId)
        {
            var result = await _financialService.GetServiceByServiceTypeAndSubType(serviceType, serviceSubType, tenentId);
            return result;
        }
        
        [HttpGet]
        [Route("GetServiceApprovalsAsync")]
        public async Task<IEnumerable<ReturnServiceApprovals>> GetServiceApprovalsAsync()
        {
            var result = await _financialService.GetServiceApprovalsAsync();
            return result;
        }
        
        [HttpPut]
        [Route("ApproveServiceAsync")]
        public async Task<ActionResult<string>> ApproveServiceAsync(ApproveRejectServiceDto approveRejectServiceDto)
        {
            var result = await _financialService.ApproveServiceAsync(approveRejectServiceDto);
            return result;
        }
        
        [HttpGet]
        [Route("GetRejectionType")]
        public async Task<IEnumerable<RefTableDto>> GetRejectionType()
        {
            var result = await _financialService.GetRejectionType();
            return result;
        }
        
        [HttpPut]
        [Route("RejectServiceAsync")]
        public async Task<ActionResult<string>> RejectServiceAsync(ApproveRejectServiceDto approveRejectServiceDto)
        {
            var result = await _financialService.RejectServiceAsync(approveRejectServiceDto);
            return result;
        }
        
        [HttpGet]
        [Route("GetServiceApprovalsByEmployeeId")]
        public async Task<IEnumerable<ReturnServiceApprovals>> GetServiceApprovalsByEmployeeId(string employeeId)
        {
            var result = await _financialService.GetServiceApprovalsByEmployeeId(employeeId);
            return result;
        }
        
        [HttpGet]
        [Route("GetServiceApprovalDetailByTransId")]
        public async Task<IEnumerable<ReturnServiceApprovalDetails>> GetServiceApprovalDetailByTransId(int transId)
        {
            var result = await _financialService.GetServiceApprovalDetailByTransId(transId);
            return result;
        }
        
        [HttpGet]
        [Route("GetServiceType")]
        public async Task<IEnumerable<SelectServiceTypeDto>> GetServiceType(int transId)
        {
            var result = await _financialService.GetServiceType(transId);
            return result;
        }

        [HttpPost]
        [Route("MakeFinancialTransactionAsync")]
        public async Task<ActionResult<int>> MakeFinancialTransactionAsync(CostCenterDto costCenterDto)
        {
            return await _financialService.MakeFinancialTransactionAsync(costCenterDto);            
        }
    }
}
