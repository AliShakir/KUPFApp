using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.DropDown;
using API.DTOs.EmployeeDto;
using API.DTOs.GetEntityDto;
using API.DTOs.LocalizationDto;
using API.DTOs.RefTable;
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
            
           
            CreateMap<GetEntityViewModel, GetEntityDto>();

            //
            CreateMap<FormTitleHDLanguage, FormTitleHDLanguageDto>();
            CreateMap<FormTitleHDLanguageDto, FormTitleHDLanguageViewModel>();

            // 
            CreateMap<FormTitleDTLanguage, FormTitleDTLanguageDto>();
            CreateMap<FormTitleDTLanguageDto, FormTitleDTLanguageViewModel>();

            //
            CreateMap<FormTitleHDLanguage, GetDistinctHDFormNameDto>();
            CreateMap<GetDistinctHDFormNameDto, GetDistinctHDFormNameViewModel>();

            CreateMap<FormTitleHDLanguageDto, FormTitleHDLanguage>();
            //CreateMap<FormTitleHDLanguage,FormTitleHDLanguage>();
            CreateMap<FormTitleDTLanguageDto,FormTitleHDLanguage>();
            //
            CreateMap<DetailedEmployee, DetailedEmployeeDto>();
            CreateMap<DetailedEmployeeDto, DetailedEmployee>();
            //
            CreateMap<FUNCTION_MST, FunctionMstDto>();
            CreateMap<FunctionMstDto,FUNCTION_MST>();
            //
            CreateMap<UserMst, UserMstDto>();
            CreateMap<UserMstDto, UserMst>();
            //
            CreateMap<Reftable, RefTableDto>();
            CreateMap<RefTableDto, Reftable>();
            //
            CreateMap<FunctionUserDto, FUNCTION_USER>();
            CreateMap<FUNCTION_USER, FunctionUserDto>();

            //
            CreateMap<Reftable, SelectOccupationDto>();
            CreateMap<Reftable, SelectDepartmentDto>();
            CreateMap<Reftable, SelectTerminationDto>();

            //
            CreateMap<ServiceSetup, SelectHajjLoanDto>();
            CreateMap<ServiceSetup, SelectLoanActDto>();
            CreateMap<ServiceSetup, SelectPerLoanActDto>();
            CreateMap<ServiceSetup, SelectConsumerLoanActDto>();
            CreateMap<ServiceSetup, SelectOtherAct1Dto>();
            CreateMap<ServiceSetup, SelectOtherAct2Dto>();
            CreateMap<ServiceSetup, SelectOtherAct3Dto>();
            CreateMap<ServiceSetup, SelectOtherAct4Dto>();

            //
            CreateMap<Coa, CoaDto>();
            // These can be deleted latter
            CreateMap<TestTableDto, TestTable>();
            CreateMap<TestTable, TestTableDto>();
            // These can be deleted latter

            //
            CreateMap<UserMst, SelectUserDto>();
            CreateMap<FUNCTION_USER, SelectMasterIdDto>();

            //
            CreateMap<FunctionForUserDto,FUNCTION_USER>();
        }
    }
}