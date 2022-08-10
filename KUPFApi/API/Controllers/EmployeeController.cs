using API.DTOs.EmployeeDto;
using API.Models;
using API.Servivces.Interfaces;
using API.Servivces.Interfaces.DetailedEmployee;
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
    }
}
