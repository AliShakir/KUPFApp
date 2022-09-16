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
    public class ServiceSetupService : IServiceSetupService
    {
        private readonly KUPFDbContext _context;
        private readonly IMapper _mapper;

        public ServiceSetupService(KUPFDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> AddServiceSetupAsync(ServiceSetupDto serviceSetupDto)
        {
            int result = 0;

            if (_context != null)
            {
                var newService = _mapper.Map<ServiceSetup>(serviceSetupDto);
                if (newService.AllowedNonEmployes=="true")
                {
                    newService.AllowedNonEmployes = "1";
                }
                else
                {
                    newService.AllowedNonEmployes = "0";
                }
                await _context.ServiceSetups.AddAsync(newService);
                result = await _context.SaveChangesAsync();
                return result;
            }

            return result;
        }

        public async Task<int> EditServiceSetupAsync(ServiceSetupDto serviceSetupDto)
        {
            int result = 0;
            if (_context != null)
            {
                if(serviceSetupDto != null)
                {
                    var existingService = _context.ServiceSetups.Where(c=>c.ServiceId == serviceSetupDto.ServiceId).FirstOrDefault();
                    if(existingService != null)
                    {
                        _mapper.Map(serviceSetupDto,existingService);
                        _context.ServiceSetups.Update(existingService);
                        result = await _context.SaveChangesAsync();
                        return result;
                    }
                }
                
            };
            return result;
        }
        public async Task<int> DeleteServiceSetupAsync(int id)
        {
            int result = 0;

            if (_context != null)
            {
                var serviceSetup = await _context.ServiceSetups.FirstOrDefaultAsync(x => x.ServiceId == id);

                if (serviceSetup != null)
                {
                    _context.ServiceSetups.Remove(serviceSetup);

                    result = await _context.SaveChangesAsync();
                }
                return result;
            }
            return result;
        }
        public async Task<ServiceSetupDto> GetServiceSetupByIdAsync(int id)
        {
            var result = await _context.ServiceSetups.Where(c => c.ServiceId == id).FirstOrDefaultAsync();
            var data = _mapper.Map<ServiceSetupDto>(result);
            return data;
        }
        public async Task<IEnumerable<ServiceSetupDto>> GetServiceSetupAsync()
        {
            var result = await _context.ServiceSetups.ToListAsync();
            var data = _mapper.Map<IEnumerable<ServiceSetupDto>>(result);
            return data;
        }

    }
}
