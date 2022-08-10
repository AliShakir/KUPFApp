using API.DTOs.RefTable;
using API.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Servivces.Implementation
{
    public class RefTableService : IRefTableService
    {
        private readonly KUPFDbContext _context;
        private readonly IMapper _mapper;

        public RefTableService(KUPFDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<RefTableDto>> GetRefTableDataAsync()
        {
            var result = await _context.Reftables.Take(5).ToListAsync();
            var data = _mapper.Map<IEnumerable<RefTableDto>>(result);
            return data;
        }
    }
}
