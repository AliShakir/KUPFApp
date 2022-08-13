using API.DTOs;
using API.Models;
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
        private readonly KUPFDbContext _context;
        public FunctionMstController(IFunctionMstService functionMstService, IMapper mapper, KUPFDbContext context)
        {
            _mapper = mapper;
            _functionMstService = functionMstService;
            _context = context;
        }

        [HttpPost]
        [Route("AddFunctionMst")]
        public async Task<ActionResult<int>> AddFunctionMst(FunctionMstDto functionMstDto)
        {
            await _functionMstService.AddFunctionMstAsync(functionMstDto);
            await _context.SaveChangesAsync();
            return functionMstDto.MENU_ID;
        }

        [HttpPut]
        [Route("UpdateFunctionMst")]
        public async Task<ActionResult<int>> UpdateFunctionMst(FunctionMstDto functionMstDto)
        {
            if (functionMstDto != null)
            {
                var result = await _functionMstService.UpdatFunctionMstAsync(functionMstDto);
                return result;
            }
            return null;
        }

        [HttpDelete]
        [Route("DeleteFunctionMst")]
        public async Task<int> DeleteFunctionMst(int id)
        {
            int result = 0;
            if (id != 0)
            {
                result = await _functionMstService.DeleteFunctionMstAsync(id);
            }
            return result;
        }

        [HttpGet]
        [Route("GetFunctionMstByIdAsync/{id}")]
        public async Task<ActionResult<IEnumerable<FunctionMstDto>>> GetFunctionMstByIdAsync(int id)
        {
            var result = await _functionMstService.GetFunctionMstByIdAsync(id);
            return Ok(result);
        }


        [HttpGet]
        [Route("GetFunctionMst")]
        public async Task<ActionResult<IEnumerable<FunctionMstDto>>> GetFunctionMst()
        {
            var result = await _functionMstService.GetFunctionMstDataAsync();
            _functionMstService.CrupMSTSelMAX(2, 3);
            return Ok(result);
        }
    }
}
