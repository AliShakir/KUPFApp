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
                var maxIdServiceId = (from d in _context.ServiceSetups
                                      where d.TenentId == serviceSetupDto.TenentId
                                      select new
                                      {
                                          ServiceId = d.ServiceId + 1
                                      })
                         .Distinct()
                         .OrderBy(x => 1).Max(c => c.ServiceId);
                var newService = _mapper.Map<ServiceSetup>(serviceSetupDto);
                newService.ServiceId = maxIdServiceId;
                
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
                if (serviceSetupDto != null)
                {
                    var existingService = _context.ServiceSetups.Where(c => c.ServiceId == serviceSetupDto.ServiceId).FirstOrDefault();
                    if (existingService != null)
                    {
                        _mapper.Map(serviceSetupDto, existingService);
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
        public Task<List<ServiceSetupDto>> GetServiceSetupAsync()
        {
            var result = (from r in _context.Reftables
                        join s in _context.ServiceSetups
                        on r.Refid equals s.ServiceType
                        where r.Refsubtype == "ServiceType"
                        select new ServiceSetupDto
                        {
                            TenentId = s.TenentId,
                            ServiceId = s.ServiceId,
                            ServiceName1 = s.ServiceName1,
                            ServiceName2 = s.ServiceName2,
                            ServiceType = s.ServiceType,
                            ServiceTypeName = r.Shortname,
                            MinInstallment = s.MinInstallment,
                            MaxInstallment = s.MaxInstallment,
                            AllowDiscountAmount = s.AllowDiscountAmount
                        }).ToListAsync();
            return result;
        }

    }
}
