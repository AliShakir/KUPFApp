using API.DTOs;
using API.DTOs.EmployeeDto;
using API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Servivces.Interfaces.DetailedEmployee
{
    public interface IDetailedEmployeeService
    {
        Task<string> AddEmployeeAsync(DetailedEmployeeDto detailedEmployeeDto);
        Task<string> UpdateEmployeeAsync(DetailedEmployeeDto user);
        Task<DetailedEmployeeDto> GetEmployeeByIdAsync(string id);
        Task<PagedList<DetailedEmployeeDto>> GetEmployeesAsync(PaginationParams paginationParams);
        Task<int> DeleteEmployeeAsync(DetailedEmployeeDto detailedEmployeeDto);
         
        Task<string> ValidateEmployeeData(DetailedEmployeeDto detailedEmployeeDto);
    }
}
