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
    public class UserMstController : ControllerBase
    {
        private readonly IUserMstService _userMstServiceService;
        public IMapper _mapper { get; }
        public UserMstController(IUserMstService userMstServiceService, IMapper mapper)
        {
            _mapper = mapper;
            _userMstServiceService = userMstServiceService;
        }
        [HttpGet]
        [Route("GetUserMstData")]
        public async Task<ActionResult<IEnumerable<UserMstDto>>> GetUserMstData()
        {
            var result = await _userMstServiceService.GetUserMstDataAsync();
            return Ok(result);
        }
    }
}
