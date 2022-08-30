using API.DTOs;
using API.DTOs.EmployeeDto;
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
        Task<IEnumerable<DetailedEmployeeDto>> GetEmployeesAsync();
        Task<int> DeleteEmployeeAsync(string id);

        // This api will be deleted latter.
        Task<int> AddTestUser(TestTableDto testTableDto);
        Task<IEnumerable<TestTableDto>> GetUsers();
        Task<TestTableDto> GetTestUserById(int id);
        Task<int> GetUpdateTestUserById(TestTableDto testTableDto);
    }
}
