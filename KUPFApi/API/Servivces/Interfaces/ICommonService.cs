using API.DTOs;
using API.DTOs.DropDown;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Servivces.Interfaces
{
    public interface ICommonService 
    {             
        Task<IEnumerable<SelectOccupationDto>> GetOccupationsAsync();
        Task<IEnumerable<SelectDepartmentDto>> GetDepartmentsAsync();
        Task<IEnumerable<SelectTerminationDto>> GetTerminationsAsync();
        Task<IEnumerable<SelectHajjLoanDto>> GetHajjLoanAsync();
        Task<IEnumerable<SelectLoanActDto>> GetLoanActAsync();
        Task<IEnumerable<SelectConsumerLoanActDto>> GetConsumerLoanActAsync();
        Task<IEnumerable<SelectPerLoanActDto>> GetPerLoanActAsync();
        Task<IEnumerable<SelectOtherAct1Dto>> GetOtherAcc1Async();
        Task<IEnumerable<SelectOtherAct2Dto>> GetOtherAcc2Async();
        Task<IEnumerable<SelectOtherAct3Dto>> GetOtherAcc3Async();
        Task<IEnumerable<SelectOtherAct4Dto>> GetOtherAcc4Async();
    }
}
