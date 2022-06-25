using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.LocalizationDto;
using API.Models;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<FormTitleDt, FormTitleDtDto>();
            CreateMap<FormTitleHd, FormTitleHdDto>();
        }
    }
}