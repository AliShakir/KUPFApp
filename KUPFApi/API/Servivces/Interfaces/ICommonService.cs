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

        Task<IEnumerable<CoaDto>> VerifyAccount(Int64 accountNo);

        Task<IEnumerable<SelectUserDto>> GetUsers();

        Task<IEnumerable<SelectMasterIdDto>> GetMasterId();

        /// <summary>
        /// Get All RefTypes
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<SelectRefTypeDto>> GetRefType();
        /// <summary>
        /// Get All RefSubTypes
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<SelectRefSubTypeDto>> GetRefSubType();
        /// <summary>
        /// Get RefSubType by RefType....
        /// </summary>
        /// <param name="refType"></param>
        /// <returns></returns>
        Task<IEnumerable<SelectRefSubTypeDto>> GetRefSubTypeByRefType(string refType);

        /// <summary>
        /// Get Service Type
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<SelectServiceTypeDto>> GetServiceType();
        /// <summary>
        /// GetMinMonthOfServices
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<SelectMinMonthOfServicesDto>> GetMinMonthOfServices();
        /// <summary>
        /// GetMinInstallments
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<SelectMinInstallmentDto>> GetMinInstallments();
        /// <summary>
        /// GetMaxInstallments
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<SelectMaxInstallmentDto>> GetMaxInstallments();

        Task<IEnumerable<SelectApprovalRoleDto>> GetApprovalRoles();

    }
}
