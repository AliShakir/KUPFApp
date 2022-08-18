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
        public async Task<ActionResult<IEnumerable<LoginDto>>> EmployeeLogin(LoginDto loginDto)
        {
            string decodedPass = CommonMethods.EncodePass(loginDto.password);
            var user = await _context.UserMsts.
                Where(c => c.LoginId == loginDto.username && c.Password == decodedPass)
                .ToListAsync();
            List<LoginDto> userList = new List<LoginDto>();
            if (user.Count() >= 1 )
            {
                for (int i = 0; i < user.Count(); i++)
                {
                    var dto = new LoginDto
                    {
                        username = user[i].LoginId,
                        LocationId = user[i].LocationId,
                        TenantId = user[i].TenentId
                    };
                    userList.Add(dto);
                }
                return userList;
            }

            return userList;
        }
    }
}
