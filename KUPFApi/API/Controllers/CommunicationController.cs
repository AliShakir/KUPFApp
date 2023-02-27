using API.DTOs;
using API.Models;
using API.Servivces.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommunicationController : ControllerBase
    {
        private readonly ICommunicationService _communicationService;
       // public IMapper _mapper { get; }
       // private readonly KUPFDbContext _context;
        //ICommunicationService
        public CommunicationController(ICommunicationService communicationService)
        {
           // _mapper = mapper;
            _communicationService = communicationService;
           //_context = context;
        }


        [HttpGet]
        [Route("getIncommingCommunication")]
        public async Task<ActionResult<IEnumerable<IncommingCommunicationDto>>> GetIncommingCommunicationAsync()
        {
            var result = await _communicationService.GetIncommingCommunicationAsync();
            return Ok(result);
        }


        [HttpDelete]
        [Route("deleteIncommingCommunication")]
        public async Task<int> DeleteRefTable(int id)
        {
            int result = 0;
            if (id != 0)
            {
                result = await _communicationService.deleteIncommingCommunication(id);
            }
            return result;
        }



        [HttpGet]
        [Route("getIncommingCommunicationById/{id}")]
        public async Task<ActionResult<IncommingCommunicationDto>> getIncommingCommunicationByIdAsync(int id)
        {
            var result = await _communicationService.getIncommingCommunicationByIdAsync(id);
            return Ok(result);
        }




    }
}
