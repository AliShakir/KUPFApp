using API.DTOs;
using API.DTOs.EmployeeDto;
using API.Models;
using API.Servivces.Interfaces;
using API.Servivces.Interfaces.DetailedEmployee;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
    public class EmployeeController : ControllerBase
    {
        private readonly KUPFDbContext _context;
        private readonly IDetailedEmployeeService _detailedEmployeeService;
        public IMapper _mapper;
        public EmployeeController(KUPFDbContext context, IDetailedEmployeeService detailedEmployeeService, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _detailedEmployeeService = detailedEmployeeService;
        }
        [HttpPost]
        [Route("AddEmployee")]
        public async Task<ActionResult<string>> AddEmployee(DetailedEmployeeDto detailedEmployeeDto)
        {
            await _detailedEmployeeService.AddEmployeeAsync(detailedEmployeeDto);
            await _context.SaveChangesAsync();
            return detailedEmployeeDto.EmployeeId;
        }
        [HttpPut]
        [Route("UpdateEmployee")]
        public async Task<ActionResult<string>> UpdateEmployee(DetailedEmployeeDto detailedEmployeeDto)
        {
            if (detailedEmployeeDto != null)
            {
                var result = await _detailedEmployeeService.UpdateEmployeeAsync(detailedEmployeeDto);
                return result;
            }            
            return null;
        }
        [HttpGet]
        [Route("GetEmployeeById")]
        public async Task<DetailedEmployeeDto> GetEmployeeById(string employeeId)
        {
            if (employeeId != null)
            {
                var result = await _detailedEmployeeService.GetEmployeeByIdAsync(employeeId);
                return result;
            }              
            return null;
        }
        [HttpGet]
        [Route("GetEmployees")]
        public async Task<IEnumerable<DetailedEmployeeDto>> GetEmployees()
        {
            var result = await _detailedEmployeeService.GetEmployeesAsync();
            return result;
        }
        [HttpDelete]
        [Route("DeleteEmployee")]
        public async Task<int> DeleteEmployee(string employeeId)
        {
            int result = 0;
            if(employeeId != null)
            {
                result = await _detailedEmployeeService.DeleteEmployeeAsync(employeeId);
            }
            
            return result;
        }
        //[Authorize]
        //[HttpPost]
        //[Route("AddTestUser")]
        //public async Task<ActionResult<int>> AddTestUser(TestTableDto testTable)
        //{
        //    int val = await _detailedEmployeeService.AddTestUser(testTable);
        //    await _context.SaveChangesAsync();
        //    return val;
        //}
        //[Authorize]
        //[HttpGet]
        //[Route("GetTestUsers")]
        //public async Task<IEnumerable<TestTableDto>> GetTestUsers()
        //{
        //    var result = await _detailedEmployeeService.GetUsers();
        //    return result;
        //}
        //[Authorize]
        //[HttpGet]
        //[Route("GetTestUserById")]
        //public async Task<TestTableDto> GetTestUserById(int id)
        //{
        //    var result = await _detailedEmployeeService.GetTestUserById(id);
        //    return result;
        //}
        //[HttpPut]
        //[Route("UpdateTestUserById")]
        //public async Task<int> UpdateTestUserById(TestTableDto testTableDto)
        //{
        //    int result = await _detailedEmployeeService.GetUpdateTestUserById(testTableDto);
        //    return result;
        //}
    }
}
