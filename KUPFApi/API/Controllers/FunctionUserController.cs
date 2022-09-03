using API.DTOs;
using API.Models;
using API.Servivces.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FunctionUserController : ControllerBase
    {
        private readonly IFunctionUserService _functionUserService;
        public IMapper _mapper { get; }
        private readonly KUPFDbContext _context;
        public FunctionUserController(IFunctionUserService functionUserService, IMapper mapper, KUPFDbContext context)
        {
            _mapper = mapper;
            _functionUserService = functionUserService;
            _context = context;
        }

        [HttpPost]
        [Route("AddFunctionUser")]
        public async Task<ActionResult<int>> AddFunctionUser(FunctionUserDto functionUserDto)
        {
            await _functionUserService.AddFunctionUserAsync(functionUserDto);
            await _context.SaveChangesAsync();
            return functionUserDto.MODULE_ID;
        }
        [HttpPut]
        [Route("UpdateFunctionUser")]
        public async Task<ActionResult<int>> UpdateFunctionUser(FunctionUserDto functionUserDto)
        {
            if (functionUserDto != null)
            {
                var result = await _functionUserService.UpdatFunctionUserAsync(functionUserDto);
                return result;
            }
            return null;
        }
        [HttpDelete]
        [Route("DeleteFunctionUser")]
        public async Task<int> DeleteFunctionUser(int id)
        {
            int result = 0;
            if (id != 0)
            {
                result = await _functionUserService.DeletFunctionUserAsync(id);
            }

            return result;
        }
        [HttpGet]
        [Route("GetFunctionUserByMasterIdAsync")]
        public async Task<ActionResult<IEnumerable<FunctionUserDto>>> GetFunctionUserByMasterIdAsync(int masterId)
        {
            var result = await _functionUserService.GetFunctionUserByMasterIdAsync(masterId);
            return Ok(result);
        }
        [HttpGet]
        [Route("GetFunctionUser")]
        public async Task<ActionResult<FunctionUserDto>> GetFunctionUser()
        {
            var result = await _functionUserService.GetFunctionUserAsync();
            return Ok(result);
        }
        [HttpPost]
        [Route("AddFunctionForUser")]
        public async Task<ActionResult<int>> AddFunctionForUser([FromBody] FunctionForUserDto[] functionForUserDto)
        {

            var userExistingUserRights = _context.FUNCTION_USER
                .Where(c => c.USER_ID == functionForUserDto.FirstOrDefault().USER_ID).ToList();
            
            if (userExistingUserRights.Count > 0)
            {
                await _functionUserService.DeleteFunctionUserByUserIdAsync(functionForUserDto.FirstOrDefault().USER_ID);
            }           

            for (int i = 0; i < functionForUserDto.Length; i++)
            {
                _context.ChangeTracker.Clear();
                await _functionUserService.AddFunctionsForUserAsync(functionForUserDto[i]);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }
        [HttpGet]
        [Route("GetFunctionUserByUserIdAsync")]
        public async Task<ActionResult<IEnumerable<FunctionUserDto>>> GetFunctionUserByUserIdAsync(int id)
        {
            var result = await _functionUserService.GetFunctionUserByUserIdAsync(id);
            if (!result.Any())
            {
                return RedirectToAction("GetFunctionMst", "FunctionMst");
            }
            return Ok(result);
        }
        [HttpGet]
        [Route("GetModuleWiseMenuItems")]
        public async Task<ActionResult<IEnumerable<FunctionUserDto>>> GetModuleWiseMenuItems()
        {
            var result = await _functionUserService.GetModuleWiseMenuItems();
            return Ok(result);
        }
        
    }
}
