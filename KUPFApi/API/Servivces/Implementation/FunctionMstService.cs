using API.DTOs;
using API.Models;
using API.Servivces.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Servivces.Implementation
{
    public class FunctionMstService : IFunctionMstService
    {
        private readonly KUPFDbContext _context;
        private readonly IMapper _mapper;

        public FunctionMstService(KUPFDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<FunctionMstDto>> GetFunctionMstDataAsync()
        {
            var result = await _context.FUNCTION_MST.ToListAsync();
            var data = _mapper.Map<IEnumerable<FunctionMstDto>>(result);
            return data;
        }
    }
}
