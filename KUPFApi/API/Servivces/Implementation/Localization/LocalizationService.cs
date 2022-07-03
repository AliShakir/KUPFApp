using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Common;
using API.DTOs;
using API.DTOs.GetEntityDto;
using API.DTOs.LocalizationDto;
using API.Models;
using API.Servivces.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Servivces.Implementation.Localization
{
    public class LocalizationService : ILocalizationService
    {
        private readonly KUPFDbContext _context;
        private readonly IMapper _mapper;
        public LocalizationService(KUPFDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;            
        }

        public async Task<IEnumerable<TestCompaniesDto>> GetCompanyAndEmployees()
        {
            return await _context.TestCompanies
                        .ProjectTo<TestCompaniesDto>(_mapper.ConfigurationProvider)
                        .ToListAsync();
        }

        public async Task<IEnumerable<FormTitleHDLanguageDto>> GetFormLanguageByFormName(string formId,int languageId)
        {
            var result = await _context.FormTitleHDLanguage.Where(c=>c.FormID == formId && c.Language == languageId).Include(o=> o.FormTitleDTLanguage.Where(p=>p.Language == languageId)).ToListAsync();
            var data = _mapper.Map<IEnumerable<FormTitleHDLanguageDto>>(result);
            return data;
        }
    }
}