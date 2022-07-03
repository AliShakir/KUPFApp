using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.GetEntityDto;
using API.DTOs.LocalizationDto;
using API.Models;
using API.Servivces.Interfaces;
using API.ViewModels.GetEntityViewModel;
using API.ViewModels.Localization;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormLabelsController : ControllerBase
    {
        private readonly ILocalizationService _localizationService;
        public IMapper _mapper { get; }
        public FormLabelsController(ILocalizationService localizationService, IMapper mapper)
        {
            _mapper = mapper;
           _localizationService = localizationService;
        }
        [HttpGet("GetFormLabels")]
        [Route("GetFormLabels/{formId}/{languageId}")]
        public async Task<ActionResult<IEnumerable<FormTitleHDLanguageViewModel>>> GetFormLabels(string formId,int languageId)
        {            
            var result = await _localizationService.GetFormLanguageByFormName(formId,languageId);

            return Ok(result);
        }
        [HttpGet("GetCompanyAndEmployees")]
        public async Task<ActionResult<IEnumerable<TestCompany>>> GetCompanyAndEmployees()
        {
            var result = await _localizationService.GetCompanyAndEmployees();
            
            return Ok(result);
        }
    }
}