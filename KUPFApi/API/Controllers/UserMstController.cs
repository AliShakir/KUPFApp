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
    public class UserMstController : ControllerBase
    {
        private readonly IUserMstService _userMstServiceService;
        public IMapper _mapper { get; }
        private readonly KUPFDbContext _context;
        public UserMstController(IUserMstService userMstServiceService, IMapper mapper, KUPFDbContext context)
        {
            _mapper = mapper;
            _userMstServiceService = userMstServiceService;
            _context = context;
        }
        [HttpPost]
        [Route("AddUserMst")]
        public async Task<ActionResult<int>> AddUserMst(UserMstDto userMstDto)
        {
            await _userMstServiceService.AddUserMstAsync(userMstDto);
            await _context.SaveChangesAsync();
            return userMstDto.UserId;
        }
        [HttpPut]
        [Route("UpdateUserMst")]
        public async Task<ActionResult<int>> UpdateUserMst(UserMstDto userMstDto)
        {
            if (userMstDto != null)
            {
                var result = await _userMstServiceService.UpdatUserMstAsync(userMstDto);
                return result;
            }
            return null;
        }
        [HttpDelete]
        [Route("DeleteUserMst")]
        public async Task<int> DeleteUserMst(int userId)
        {
            int result = 0;
            if (userId != 0)
            {
                result = await _userMstServiceService.DeleteUserMstAsync(userId);
            }

            return result;
        }
        [HttpGet]
        [Route("GetUserMstById/{userId}")]
        public async Task<ActionResult<IEnumerable<UserMstDto>>> GetUserMstByIdAsync(int userId)        
        {
            var result = await _userMstServiceService.GetUserMstByIdAsync(userId);
            return Ok(result);
        }
        [HttpGet]
        [Route("GetUserMst")]
        public async Task<ActionResult<IEnumerable<UserMstDto>>> GetUserMst()
        {
            var result = await _userMstServiceService.GetUserMstAsync();
            return Ok(result);
        }
    }
}
