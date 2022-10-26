using API.DTOs;
using API.DTOs.FinancialServicesDto;
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
        public async Task<TransactionHdDto> GetFinancialServiceById(long transId)
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
    }
}
