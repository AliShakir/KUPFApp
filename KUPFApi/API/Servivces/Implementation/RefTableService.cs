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

        public async Task<int> AddRefTableAsync(RefTableDto refTableDto)
        {
            int result = 0;
            
            if (_context != null)
            {
                var newRefTable = _mapper.Map<Reftable>(refTableDto);
                
                await _context.Reftables.AddAsync(newRefTable);
                
                result = await _context.SaveChangesAsync();
                
                return result;
            }
            
            return result;
        }
        public async Task<int> UpdatRefTableAsync(RefTableDto refTableDto)
        {
            int result = 0;
            if (_context != null)
            {
                var existingRefTable = _mapper.Map<Reftable>(refTableDto);
                
                _context.Reftables.Update(existingRefTable);
                result = await _context.SaveChangesAsync();
                
                return result;
            };
            return result;
        }
        public async Task<int> DeleteRefTableAsync(int id)
        {
            int result = 0;

            if (_context != null)
            {
                var refTable = await _context.Reftables.FirstOrDefaultAsync(x => x.Refid == id);

                if (refTable != null)
                {
                    _context.Reftables.Remove(refTable);

                    result = await _context.SaveChangesAsync();
                }
                return result;
            }
            return result;
        }
       
        public async Task<IEnumerable<RefTableDto>> GetRefTableAsync()
        {
            var result = await _context.Reftables.Take(5).ToListAsync();
            var data = _mapper.Map<IEnumerable<RefTableDto>>(result);
            return data;
        }

        public async Task<RefTableDto> GetRefTableByIdAsync(int refId)
        {
            var result = await _context.Reftables.Where(c => c.Refid == refId).FirstOrDefaultAsync();
            var data = _mapper.Map<RefTableDto>(result);
            return data;
        }

        
    }
}
