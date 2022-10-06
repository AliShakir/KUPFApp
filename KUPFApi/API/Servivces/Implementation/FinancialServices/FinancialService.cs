using API.DTOs;
using API.DTOs.FinancialServicesDto;
using API.Models;
using API.Servivces.Interfaces.FinancialServices;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Servivces.Implementation.FinancialServices
{
    public class FinancialService : IFinancialService
    {
        private readonly KUPFDbContext _context;
        private readonly IMapper _mapper;
        public FinancialService(KUPFDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ServiceSetupDto> GetServiceByServiceTypeAndSubType(int serviceType, int serviceSubType, int tenentId)
        {
            var result = await _context.ServiceSetups.Where(c => c.ServiceType == serviceType && c.ServiceSubType == serviceSubType && c.TenentId == tenentId).FirstOrDefaultAsync();
            var data = _mapper.Map<ServiceSetupDto>(result);
            return data;
        }

    }
}
