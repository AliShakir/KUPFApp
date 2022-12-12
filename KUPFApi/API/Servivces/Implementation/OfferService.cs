using API.DTOs;
using API.Models;
using API.Servivces.Interfaces;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace API.Servivces.Implementation
{
    public class OfferService : IOfferService
    {
        private readonly KUPFDbContext _context;
        private readonly IMapper _mapper;
        public OfferService(KUPFDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> AddOffer(OffersDto offersDto)
        {
            int result = 0;

            if (_context != null)
            {
                // To get the max Id.
                var maxIdServiceId = (from d in _context.ServiceSetups
                                      where d.TenentId == offersDto.TenentId
                                      select new
                                      {
                                          ServiceId = d.ServiceId + 1
                                      })
                         .Distinct()
                         .OrderBy(x => 1).Max(c => c.ServiceId);
                var newService = new ServiceSetup()
                {
                    TenentId = offersDto.TenentId,
                    Userid = offersDto.Userid,
                    OfferType = offersDto.OfferType,
                    Offer = "Offer",
                    OfferStartDate = offersDto.OfferStartDate,
                    OfferEndDate = offersDto.OfferEndDate,
                    OfferAmount = offersDto.OfferAmount,
                    MasterServiceId = "0"
                };
                newService.ServiceId = maxIdServiceId;
                if (offersDto.File1 != null && offersDto.File1.Length != 0)
                {
                    
                    var path = @"/HostingSpaces/kupf1/kupfapi.erp53.com/new/OfferImages";
                    //var path = @"E:\\";
                    var fileExtenstion = Path.GetExtension(offersDto.File1.FileName);
                    var filePath = Path.Combine(path, Guid.NewGuid() + fileExtenstion);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        offersDto.File1.CopyTo(stream);
                    }
                    newService.OfferImage = Guid.NewGuid() + fileExtenstion;
                }

                await _context.ServiceSetups.AddAsync(newService);
                result = await _context.SaveChangesAsync();
                return result;
            }

            return result;
        }

        public async Task<int> DeleteOffer(int id)
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

        public async Task<int> EditOffer(OffersDto offersDto)
        {
            int result = 0;
            if (_context != null)
            {
                if (offersDto != null)
                {
                    var existingService = _context.ServiceSetups.Where(c => c.ServiceId == offersDto.ServiceId).FirstOrDefault();
                                       
                    existingService.TenentId = offersDto.TenentId;
                    existingService.Userid = offersDto.Userid;
                    existingService.OfferType = offersDto.OfferType;
                    existingService.Offer = "Offer";
                    existingService.OfferStartDate = offersDto.OfferStartDate;
                    existingService.OfferEndDate = offersDto.OfferEndDate;
                    existingService.OfferAmount = offersDto.OfferAmount;                    
                    
                    if (offersDto.File1 != null && offersDto.File1.Length != 0)
                    {
                        
                        var path = @"/HostingSpaces/kupf1/kupfapi.erp53.com/new/OfferImages";
                        //var path = @"E:\\";
                        var fileExtenstion = Path.GetExtension(offersDto.File1.FileName);
                        var filePath = Path.Combine(path, Guid.NewGuid() + fileExtenstion);
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            offersDto.File1.CopyTo(stream);
                        }
                        existingService.OfferImage = Guid.NewGuid() + fileExtenstion;
                    }
                    _context.ServiceSetups.Update(existingService);
                    result = await _context.SaveChangesAsync();
                    return result;
                }

            };
            return result;
        }

        public async Task<ServiceSetupDto> GetOfferById(int id)
        {
            var result = await _context.ServiceSetups.Where(c => c.ServiceId == id && c.Offer == "Offer").FirstOrDefaultAsync();
            var data = _mapper.Map<ServiceSetupDto>(result);
            return data;
        }

        public async Task<IEnumerable<ServiceSetupDto>> GetOffers()
        {
            var result = _context.ServiceSetups.Where(c=>c.Offer == "Offer").ToList();
            var data = _mapper.Map<IEnumerable<ServiceSetupDto>>(result);
            return data;
        }
    }
}
