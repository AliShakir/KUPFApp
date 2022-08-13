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
    public class CrupMstController : ControllerBase
    {
        private readonly ICrupMstServivce _crupMstService;
        public IMapper _mapper { get; }
        private readonly KUPFDbContext _context;
        public CrupMstController(ICrupMstServivce crupMstService, IMapper mapper, KUPFDbContext context)
        {
            _mapper = mapper;
            _crupMstService = crupMstService;
            _context = context;
        }

        [HttpPost]
        [Route("AddCrupMst")]
        public ActionResult<int> AddCrupMst(CrupMstDto crupMstDto)
        {
            int result = _crupMstService.InsertCrupMstAsync(crupMstDto);           
            return result;
        }
        [HttpPost]
        [Route("UpdateCrupMst")]
        public ActionResult<int> UpdateCrupMst(CrupMstDto crupMstDto)
        {
            int result = _crupMstService.UpdatCrupMstAsync(crupMstDto);
            return result;
        }
        [HttpPost]
        [Route("DeleteCrupMst")]
        public ActionResult<int> DeleteCrupMst(int tenantId, int locationId, Int64 crupId)
        {
            int result = _crupMstService.DeleteCrupMstAsync(tenantId, locationId, crupId);
            return result;
        }
        //[HttpPost]
        //[Route("SelectCrupMst")]
        //public async Task<ActionResult<IEnumerable<CrupMstDto>>> SelectCrupMst(int tenantId, int locationId, Int64 crupId)
        //{
        //    var result = await _crupMstService.GetCrupMstAsync(tenantId, locationId, crupId);            
        //    return result.ToList();
        //}
    }
}
