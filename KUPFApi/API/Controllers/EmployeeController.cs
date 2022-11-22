using API.DTOs;
using API.DTOs.EmployeeDto;
using API.Helpers;
using API.Models;
using API.Servivces.Interfaces;
using API.Servivces.Interfaces.DetailedEmployee;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        /// <summary>
        /// Api to add new employee
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("AddEmployee")]
        public async Task<ActionResult<string>> AddEmployee(DetailedEmployeeDto detailedEmployeeDto)
        {
            await _detailedEmployeeService.AddEmployeeAsync(detailedEmployeeDto);
            await _context.SaveChangesAsync();
            return detailedEmployeeDto.EmployeeId;
        }
        /// <summary>
        /// Api to update existing employee
        /// </summary>
        /// <returns></returns>
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
        /// <summary>
        /// Api to Get existing employee By Id
        /// </summary>
        /// <returns></returns>
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
        /// <summary>
        /// Api to Get existing employees
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetEmployees")]
        public async Task<PagedList<DetailedEmployeeDto>> GetEmployees([FromQuery] PaginationParams paginationParams)
        {
            var result = await _detailedEmployeeService.GetEmployeesAsync(paginationParams);            
            Response.AddPaginationHeader(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);
            return result;
        }
        /// <summary>
        /// Api to deleted employee By Id
        /// </summary>
        /// <returns></returns>
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
