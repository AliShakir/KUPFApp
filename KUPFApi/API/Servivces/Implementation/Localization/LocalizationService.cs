using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
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
using Newtonsoft.Json.Linq;

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

        public async Task<IEnumerable<FormTitleHDLanguageDto>> GetFormHeaderLabelsByFormName(string formId, int languageId)
        {
            var result = await _context.FormTitleHDLanguage.Where(c => c.FormID == formId && c.Language == languageId).ToListAsync();
            var data = _mapper.Map<IEnumerable<FormTitleHDLanguageDto>>(result);
            return data;
        }

        
        public async Task<IEnumerable<FormTitleDTLanguageDto>> GetFormBodyLabelsByFormName(string formId, int languageId)
        {
            var result = await _context.FormTitleDTLanguage.Where(c => c.FormID == formId && c.Language == languageId).ToListAsync();
            var data = _mapper.Map<IEnumerable<FormTitleDTLanguageDto>>(result);
            return data;
        }

        public async Task<IEnumerable<FormTitleDTLanguageDto>> GetAll(string formId, int langId)
        {
            var result = await _context.FormTitleDTLanguage.Where(x=>x.FormID== formId && x.Language== langId).ToListAsync();
            
            var data = _mapper.Map<IEnumerable<FormTitleDTLanguageDto>>(result);
            return data;
        }
    }
}