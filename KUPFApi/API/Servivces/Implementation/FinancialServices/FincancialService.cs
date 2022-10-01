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
    public class FincancialService : IFinancialService
    {
        private readonly KUPFDbContext _context;
        private readonly IMapper _mapper;
        public FincancialService(KUPFDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ServiceTypeAndSubTypeIdsDto>> GetServiceTypeAndSubType()
        {
            var result = await _context.ServiceSetups.Where(c=>c.TenentId == 21).ToListAsync();
            var data = _mapper.Map<IEnumerable<ServiceTypeAndSubTypeIdsDto>>(result);
            return data;
        }
    }
}
