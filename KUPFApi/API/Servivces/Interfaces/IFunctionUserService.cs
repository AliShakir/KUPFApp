using API.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Servivces.Interfaces
{
    public interface IFunctionUserService
    {
        Task<int> AddFunctionUserAsync(FunctionUserDto functionUserDto);
        Task<int> UpdatFunctionUserAsync(FunctionUserDto functionUserDto);
        Task<int> DeletFunctionUserAsync(int id);
        Task<FunctionUserDto> GetFunctionUserByIdAsync(int userId);
        Task<IEnumerable<FunctionUserDto>> GetFunctionUserAsync();
    }
}
