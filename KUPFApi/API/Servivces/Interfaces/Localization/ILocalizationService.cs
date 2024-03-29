using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.GetEntityDto;
using API.DTOs.LocalizationDto;
using API.Models;

namespace API.Servivces.Interfaces
{
    public interface ILocalizationService
    {
        Task<IEnumerable<FormTitleHDLanguageDto>> GetFormHeaderLabelsByFormName(string formId,int LanguageId);
        Task<IEnumerable<FormTitleDTLanguageDto>> GetFormBodyLabelsByFormName(string formId,int languageId);
        Task<IEnumerable<TestCompaniesDto>> GetCompanyAndEmployees();
        Task<IEnumerable<FormTitleHDLanguageDto>> GetAll(string formId, int langId);

        Task<IEnumerable<FormTitleHDLanguageDto>> GetAllAppLabels();
        Task<IEnumerable<FormTitleHDLanguageDto>> GetAllFormHeaderLabels();
        Task<IEnumerable<FormTitleHDLanguageDto>> GetFormHeaderLabelsByFormId(string formId);
        Task<IEnumerable<FormTitleDTLanguageDto>> GetFormBodyLabelsByFormId(string formId);

        Task<FormTitleHDLanguage> GetFormHeaderById(Guid id);
        Task<FormTitleDTLanguage> GetFormBodyById(int id);
        void EditFormHeaderLabels(FormTitleHDLanguage formHeader);
         
        void EditFormBodyLabels(FormTitleDTLanguage formBody);

        Task<bool> SaveAllAsync();
    }
}