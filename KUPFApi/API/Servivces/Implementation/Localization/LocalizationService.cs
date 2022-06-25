using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using API.Servivces.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Servivces.Implementation.Localization
{
    public class LocalizationService : ILocalizationService
    {
        private readonly DataContext _context;
        public LocalizationService(DataContext context)
        {
            _context = context;            
        }
        public async Task<IEnumerable<FormTitleHd>> GetFormLanguageByFormName(string formId)
        {
            return await _context.FormTitleHD.Where(c=>c.FormId.Contains(formId)).ToListAsync();
        }
    }
}