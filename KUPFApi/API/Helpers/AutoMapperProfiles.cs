using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.GetEntityDto;
using API.DTOs.LocalizationDto;
using API.Models;
using API.ViewModels.GetEntityViewModel;
using API.ViewModels.Localization;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<FormTitleDt, FormTitleDtDto>();
            CreateMap<FormTitleHd, FormTitleHdDto>();
            CreateMap<TestCompany, TestCompaniesDto>();
            CreateMap<TestEmployee, TestEmployeesDto>();
            
            // Get entity by Id (Guid)
            CreateMap<GetEntityViewModel, GetEntityDto>();

            //
            CreateMap<FormTitleHDLanguage, FormTitleHDLanguageDto>();
            CreateMap<FormTitleHDLanguageDto, FormTitleHDLanguageViewModel>();

            // 
            CreateMap<FormTitleDTLanguage, FormTitleDTLanguageDto>();
            CreateMap<FormTitleDTLanguageDto, FormTitleDTLanguageViewModel>();
        }
    }
}