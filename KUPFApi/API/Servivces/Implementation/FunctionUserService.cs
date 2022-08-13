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
    public class FunctionUserService : IFunctionUserService
    {
        private readonly KUPFDbContext _context;
        private readonly IMapper _mapper;

        public FunctionUserService(KUPFDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> AddFunctionUserAsync(FunctionUserDto functionUserDto)
        {
            int result = 0;
            if (_context != null)
            {
                var newFunctionUser = _mapper.Map<FUNCTION_USER>(functionUserDto);
                await _context.FUNCTION_USER.AddAsync(newFunctionUser);
                result = await _context.SaveChangesAsync();
                return result;
            }
            return result;
        }
        public async Task<int> UpdatFunctionUserAsync(FunctionUserDto functionUserDto)
        {
            int result = 0;
            if (_context != null)
            {
                var existingFunctionUser = _mapper.Map<FUNCTION_USER>(functionUserDto);
                _context.FUNCTION_USER.Update(existingFunctionUser);

                result = await _context.SaveChangesAsync();
                return result;
            };
            return result;
        }
        public async Task<int> DeletFunctionUserAsync(int id)
        {
            int result = 0;

            if (_context != null)
            {
                var functionUser = await _context.FUNCTION_USER.FirstOrDefaultAsync(x => x.MENU_ID == id);

                if (functionUser != null)
                {
                    _context.FUNCTION_USER.Remove(functionUser);

                    result = await _context.SaveChangesAsync();
                }
                return result;
            }
            return result;
        }

        public async Task<IEnumerable<FunctionUserDto>> GetFunctionUserAsync()
        {
            var result = await _context.FUNCTION_USER.ToListAsync();
            var data = _mapper.Map<IEnumerable<FunctionUserDto>>(result);
            return data;
        }

        public async Task<FunctionUserDto> GetFunctionUserByIdAsync(int id)
        {
            var result = await _context.FUNCTION_USER.Where(c => c.MODULE_ID == id).FirstOrDefaultAsync();
            var data = _mapper.Map<FunctionUserDto>(result);
            return data;
        }

        
    }
}
