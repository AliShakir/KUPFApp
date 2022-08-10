using API.DTOs.RefTable;
using API.Servivces;
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
    public class RefTableController : ControllerBase
    {
        private readonly IRefTableService _refTableService;
        public IMapper _mapper { get; }
        public RefTableController(IRefTableService refTableService, IMapper mapper)
        {
            _mapper = mapper;
            _refTableService = refTableService;
        }
        [HttpGet]
        [Route("GetRefTableData")]
        public async Task<ActionResult<IEnumerable<RefTableDto>>> GetRefTableData()
        {
            var result = await _refTableService.GetRefTableDataAsync();
            return Ok(result);
        }
    }
}
