using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.LocalizationDto;
using API.Models;
using API.Servivces.Interfaces;
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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FormTitleHdDto>>> GetFormLabels(string formId)
        {
            var result = await _localizationService.GetFormLanguageByFormName("EmployeeGrid");

            var localizedObjects = _mapper.Map<IEnumerable<FormTitleHdDto>>(result);

            return Ok(localizedObjects);
        }
    }
}