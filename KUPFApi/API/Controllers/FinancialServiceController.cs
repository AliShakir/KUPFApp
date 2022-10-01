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
        [HttpGet]
        [Route("GetServiceTypeAndSubType")]
        public async Task<IEnumerable<ServiceTypeAndSubTypeIdsDto>> GetServiceTypeAndSubType()
        {
            var result = await _financialService.GetServiceTypeAndSubType();
            return result;
        }
    }
}
