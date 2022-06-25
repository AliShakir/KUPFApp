using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Servivces.Interfaces
{
    public interface ILocalizationService
    {
        Task<IEnumerable<FormTitleHd>> GetFormLanguageByFormName(string formId);
        
    }
}