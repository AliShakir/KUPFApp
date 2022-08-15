using API.Common;
using API.DTOs;
using API.Models;
using API.Servivces.Interfaces;
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
    public class LoginController : ControllerBase
    {
        private readonly KUPFDbContext _context;
        public LoginController(KUPFDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("EmployeeLogin")]
        public async Task<ActionResult<LoginDto>> EmployeeLogin(LoginDto loginDto)
        {
            string decodedPass = CommonMethods.EncodePass(loginDto.password);
            var user = await _context.DetailedEmployees.
                Where(c => c.EmployeeLoginId == loginDto.username && c.EmployeePassword == decodedPass)
                .FirstOrDefaultAsync();
            if (user != null)
            {
                return Ok("success");
            }

            return Ok("Failure");
        }
    }
}
