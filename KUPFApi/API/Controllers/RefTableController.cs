using API.DTOs.RefTable;
using API.Models;
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
        private readonly KUPFDbContext _context;
        public RefTableController(IRefTableService refTableService, IMapper mapper, KUPFDbContext context)
        {
            _mapper = mapper;
            _refTableService = refTableService;
            _context = context;
        }
        
        [HttpPost]
        [Route("AddRefTable")]
        public async Task<ActionResult<int>> AddRefTable(RefTableDto refTableDto)
        {
            await _refTableService.AddRefTableAsync(refTableDto);
            await _context.SaveChangesAsync();
            return refTableDto.Refid;
        }
        
        [HttpPut]
        [Route("UpdateRefTable")]
        public async Task<ActionResult<int>> UpdateRefTable(RefTableDto refTableDto)
        {
            if (refTableDto != null)
            {
                var result = await _refTableService.UpdatRefTableAsync(refTableDto);
                return result;
            }
            return null;
        }
        
        [HttpDelete]
        [Route("DeleteRefTable")]
        public async Task<int> DeleteRefTable(int refId)
        {
            int result = 0;
            if (refId != 0)
            {
                result = await _refTableService.DeleteRefTableAsync(refId);
            }
            return result;
        }
        
        [HttpGet]
        [Route("GetRefTableByIdRefTypeAndSubType/{refId}/{refType}/{refSubType}")]
        public async Task<ActionResult<IEnumerable<RefTableDto>>> GetRefTableByIdRefTypeAndSubType(int refId, string refType, string refSubType)
        {
            var result = await _refTableService.GetRefTableByIdAsync(refId,refType, refSubType);
            return Ok(result);
        }

        [HttpGet]
        [Route("GetRefTableData")]
        public async Task<ActionResult<IEnumerable<RefTableDto>>> GetRefTableData()
        {
            var result = await _refTableService.GetRefTableAsync();
            return Ok(result);
        }
        [HttpGet]
        [Route("GetRefTableByRefTypeAndSubType/{refType}/{refSubType}")]
        public async Task<ActionResult<IEnumerable<RefTableDto>>> GetRefTableByRefTypeAndSubType(string refType, string refSubType)
        {
            var result = await _refTableService.GetRefTableByRefTypeAndSubTypeAsync(refType, refSubType);
            return Ok(result);
        }
    }
}
