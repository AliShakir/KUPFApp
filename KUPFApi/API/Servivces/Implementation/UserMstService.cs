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
    public class UserMstService : IUserMstService
    {
        private readonly KUPFDbContext _context;
        private readonly IMapper _mapper;

        public UserMstService(KUPFDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<UserMstDto>> GetUserMstDataAsync()
        {
            var result = await _context.UserMsts.ToListAsync();
            var data = _mapper.Map<IEnumerable<UserMstDto>>(result);
            return data;
        }
    }
}
