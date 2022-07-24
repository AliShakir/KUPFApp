using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs.LocalizationDto;
using API.Helpers;
using API.Models;
using API.Servivces.Interfaces;
using API.ViewModels.Localization;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

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
        [HttpGet]
        [Route("GetFormHeaderLabels/{formId}/{languageId}")]
        public async Task<ActionResult<IEnumerable<FormTitleHDLanguageViewModel>>> GetFormHeaderLabels(string formId,int languageId)
        {            
            var result = await _localizationService.GetFormHeaderLabelsByFormName(formId,languageId);

            return Ok(result);
        }
        [HttpGet]
        [Route("GetFormBodyLabels/{formId}/{languageId}")]
        public async Task<ActionResult<IEnumerable<FormTitleDTLanguageViewModel>>> GetFormBodyLabels(string formId,int languageId)
        {            
            var result = await _localizationService.GetFormBodyLabelsByFormName(formId,languageId);

            return Ok(result);
        }
        [HttpGet]
        [Route("GetAllFormBodyLabels/{formId}/{langId}")]
        public async Task<ActionResult<IEnumerable<FormTitleDTLanguageViewModel>>> GetAllFormBodyLabels(string formId, int langId)
        {            
            var result = await _localizationService.GetAll(formId, langId);           
            return Ok(result);
        }
        [HttpGet("GetCompanyAndEmployees")]
        public async Task<ActionResult<IEnumerable<FormTitleDTLanguageViewModel>>> GetCompanyAndEmployees()
        {
            var result = await _localizationService.GetCompanyAndEmployees();
            
            return Ok(result);
        }
        [HttpGet]
        [Route("GetAllAppLabels")]
        public async Task<ActionResult<IEnumerable<FormTitleDTLanguageViewModel>>> GetAllAppLabels()
        {
            var result = await _localizationService.GetAllAppLabels();
            return Ok(result);
        }
        [HttpGet]
        [Route("GetAllFormHeaderLabels")]
        public async Task<ActionResult<IEnumerable<GetDistinctHDFormNameViewModel>>> GetAllFormHeaderLabels()
        {
            var result = await _localizationService.GetAllFormHeaderLabels();
            return Ok(result);
        }
        
        [HttpGet]
        [Route("GetFormHeaderLabelsByFormId")]
        public async Task<ActionResult<IEnumerable<FormTitleHDLanguageViewModel>>> GetFormHeaderLabelsByFormId(string formId)
        {
            var result = await _localizationService.GetFormHeaderLabelsByFormId(formId);
            return Ok(result);
        }
        [HttpGet]
        [Route("GetFormBodyLabelsByFormId")]
        public async Task<ActionResult<IEnumerable<FormTitleHDLanguageViewModel>>> GetFormBodyLabelsByFormId(string formId)
        {
            var result = await _localizationService.GetFormBodyLabelsByFormId(formId);
            return Ok(result);
        }
    }
}