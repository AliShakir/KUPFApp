using API.DTOs;
using API.Servivces.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FunctionMstController : ControllerBase
    {
        private readonly IFunctionMstService _functionMstService;
        public IMapper _mapper { get; }
        public FunctionMstController(IFunctionMstService functionMstService, IMapper mapper)
        {
            _mapper = mapper;
            _functionMstService = functionMstService;
        }
        [HttpGet]
        [Route("GetFunctionMstData")]
        public async Task<ActionResult<IEnumerable<FunctionMstDto>>> GetFunctionMstDataAsync()
        {
            var result = await _functionMstService.GetFunctionMstDataAsync();
            return Ok(result);
        }
    }
}
