using API.DTOs;
using API.DTOs.DropDown;
using API.DTOs.EmployeeDto;
using API.Models;
using API.Servivces.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Servivces.Implementation
{
    /// <summary>
    /// This class contains all functions/methods that can be use 
    /// anywhere in the project. Like if we want to fillup dropdown 
    /// from database. So that dropdown can be used anywhere in entire 
    /// project.
    /// </summary>
    public class CommonService : ICommonService
    {
        private readonly KUPFDbContext _context;
        private readonly IMapper _mapper;
        public CommonService(KUPFDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// To Get Occupations
        /// </summary>
        /// <returns></returns>

        public async Task<IEnumerable<SelectOccupationDto>> GetOccupationsAsync()
        {
            var result = await _context.Reftables
                .Where(c => c.Refsubtype == "Occupation" && c.Reftype == "KUPF" && c.TenentId == 21)
                .OrderBy(x => x.Refsubtype).ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectOccupationDto>>(result);
            return data;
        }
        /// <summary>
        /// To Get Depratments
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<SelectDepartmentDto>> GetDepartmentsAsync()
        {
            var result = await _context.Reftables
                .Where(c => c.Refsubtype == "Department").ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectDepartmentDto>>(result);
            return data;
        }
        /// <summary>
        /// To Get Terminations
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<SelectTerminationDto>> GetTerminationsAsync()
        {
            var result = await _context.Reftables
               .Where(c => c.Refsubtype == "Termination").ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectTerminationDto>>(result);
            return data;
        }

        public async Task<IEnumerable<SelectHajjLoanDto>> GetHajjLoanAsync()
        {
            var result = await _context.ServiceSetups.ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectHajjLoanDto>>(result);
            return data;
        }

        public async Task<IEnumerable<SelectLoanActDto>> GetLoanActAsync()
        {
            var result = await _context.ServiceSetups.ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectLoanActDto>>(result);
            return data;
        }

        public async Task<IEnumerable<SelectConsumerLoanActDto>> GetConsumerLoanActAsync()
        {
            var result = await _context.ServiceSetups.ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectConsumerLoanActDto>>(result);
            return data;
        }

        public async Task<IEnumerable<SelectPerLoanActDto>> GetPerLoanActAsync()
        {
            var result = await _context.ServiceSetups.ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectPerLoanActDto>>(result);
            return data;
        }

        public async Task<IEnumerable<SelectOtherAct1Dto>> GetOtherAcc1Async()
        {
            var result = await _context.ServiceSetups.ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectOtherAct1Dto>>(result);
            return data;
        }

        public async Task<IEnumerable<SelectOtherAct2Dto>> GetOtherAcc2Async()
        {
            var result = await _context.ServiceSetups.ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectOtherAct2Dto>>(result);
            return data;
        }

        public async Task<IEnumerable<SelectOtherAct3Dto>> GetOtherAcc3Async()
        {
            var result = await _context.ServiceSetups.ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectOtherAct3Dto>>(result);
            return data;
        }

        public async Task<IEnumerable<SelectOtherAct4Dto>> GetOtherAcc4Async()
        {
            var result = await _context.ServiceSetups.ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectOtherAct4Dto>>(result);
            return data;
        }

        public async Task<IEnumerable<CoaDto>> VerifyAccount(Int64 accountNo)
        {
            var result = await _context.Coas.Where(c => c.AccountNumber == accountNo && c.HeadId == 5).ToListAsync();
            var data = _mapper.Map<IEnumerable<CoaDto>>(result);
            return data;
        }

        public async Task<IEnumerable<SelectUserDto>> GetUsers()
        {
            var result = await _context.UserMsts.ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectUserDto>>(result);
            return data;
        }
        public async Task<IEnumerable<SelectMasterIdDto>> GetMasterId()
        {
            var result = await _context.FUNCTION_USER.ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectMasterIdDto>>(result);
            return data;
        }

        public async Task<IEnumerable<SelectRefTypeDto>> GetRefType()
        {
            var result = (from d in _context.Reftables
                          where d.TenentId == 21
                          select new SelectRefTypeDto
                          {
                              RefType = d.Reftype
                          })
                          .Distinct()
                          .OrderBy(x => 1);
            return result;
        }

        public async Task<IEnumerable<SelectRefSubTypeDto>> GetRefSubType()
        {
            var result = (from d in _context.Reftables
                          where d.TenentId == 21
                          select new SelectRefSubTypeDto
                          {
                              RefSubType = d.Refsubtype
                          })
                          .Distinct()
                          .OrderBy(x => 1);
            return result;
        }

        public async Task<IEnumerable<SelectRefSubTypeDto>> GetRefSubTypeByRefType(string refType)
        {
            var result = (from d in _context.Reftables
                          where d.TenentId == 21 && d.Reftype == refType
                          select new SelectRefSubTypeDto
                          {
                              RefSubType = d.Refsubtype
                          })
                          .Distinct()
                          .OrderBy(x => 1);
            return result;
        }

        public async Task<IEnumerable<SelectServiceTypeDto>> GetServiceTypeByMasterIds(int[] masterIds)
        {
            List<Reftable> list = new List<Reftable>();
            for (int i = 0; i < masterIds.Length; i++)
            {
                Reftable retTable = new Reftable();
                retTable = await _context.Reftables.Where(c => c.Refsubtype == "ServicesSubType" && c.Refid == masterIds[i]).FirstOrDefaultAsync();
                list.Add(retTable);
            }
            var data = _mapper.Map<IEnumerable<SelectServiceTypeDto>>(list);
            return data;
        }
        public async Task<IEnumerable<SelectServiceSubTypeDto>> GetServiceSubType(string switchNo)
        {
            var result = await _context.Reftables.Where(c => c.Refsubtype == "ServicesSubType" && c.Switch3 == switchNo).ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectServiceSubTypeDto>>(result);
            return data;
        }
        public async Task<IEnumerable<SelectMasterServiceTypeDto>> GetMasterGetServiceType()
        {
            var result = await _context.Reftables.Where(c => c.Refsubtype == "ServiceType").ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectMasterServiceTypeDto>>(result);
            return data;
        }
        public async Task<IEnumerable<SelectMinMonthOfServicesDto>> GetMinMonthOfServices()
        {
            var result = await _context.ServiceSetups.ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectMinMonthOfServicesDto>>(result);
            return data;
        }

        public async Task<IEnumerable<SelectMinInstallmentDto>> GetMinInstallments()
        {
            var result = await _context.ServiceSetups.ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectMinInstallmentDto>>(result);
            return data;
        }

        public async Task<IEnumerable<SelectMaxInstallmentDto>> GetMaxInstallments()
        {
            var result = await _context.ServiceSetups.ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectMaxInstallmentDto>>(result);
            return data;
        }

        public async Task<IEnumerable<SelectApprovalRoleDto>> GetApprovalRoles()
        {
            var result = await _context.Reftables
                            .Where(c => c.Refsubtype == "Role" && c.TenentId == 21).ToListAsync();

            var data = _mapper.Map<IEnumerable<SelectApprovalRoleDto>>(result);
            return data;
        }

        public async Task<DetailedEmployeeDto> SearchEmployee(SearchEmployeeDto searchEmployeeDto)
        {
            if ((string.IsNullOrWhiteSpace(searchEmployeeDto.EmployeeId)
                && string.IsNullOrWhiteSpace(searchEmployeeDto.PFId)
                && string.IsNullOrWhiteSpace(searchEmployeeDto.CID)))
            {
                throw new Exception("Invalid Input");
            }

            var result = await _context.DetailedEmployees.Where(c => c.EmployeeId == searchEmployeeDto.EmployeeId ||
                        c.Pfid == searchEmployeeDto.PFId || c.EmpCidNum == searchEmployeeDto.CID).Where(x => x.Pfid != null).FirstOrDefaultAsync();

            var data = _mapper.Map<DetailedEmployeeDto>(result);

            return data;
        }

        public async Task<IEnumerable<SelectedServiceTypeDto>> GetSelectedServiceType(int tenentId)
        {
            var selectedServiceTypes = await _context.ServiceSetups.Where(c => c.TenentId == tenentId).ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectedServiceTypeDto>>(selectedServiceTypes);
            return data;
        }

        public async Task<IEnumerable<SelectedServiceSubTypeDto>> GetSelectedServiceSubType(int tenentId)
        {
            var selectedServiceSubTypes = await _context.ServiceSetups.Where(c => c.TenentId == tenentId).ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectedServiceSubTypeDto>>(selectedServiceSubTypes);
            return data;
        }
        public async Task<IEnumerable<SelectServiceTypeDto>> GetServiceType(int tenentId)
        {
            var items = (from d in _context.ServiceSetups
                         where d.TenentId == tenentId
                         select new
                         {
                             RefId = d.ServiceType
                         }).ToList()
                         .Distinct()
                         .OrderBy(x => 1);

            List<Reftable> list = new List<Reftable>();

            foreach (var item in items)
            {
                Reftable retTable = new Reftable();
                retTable = await _context.Reftables.Where(c => c.Refsubtype == "ServicesSubType" && c.Refid == item.RefId).FirstOrDefaultAsync();
                list.Add(retTable);
            }
            var data = _mapper.Map<IEnumerable<SelectServiceTypeDto>>(list);
            return data;
        }
        public async Task<IEnumerable<SelectServiceTypeDto>> GetSubServiceTypeByServiceType(int tenentId, int refId)
        {
            var result = await _context.Reftables.Where(c => c.Refsubtype == "ServicesSubType" && c.Refid == refId && c.TenentId == tenentId).ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectServiceTypeDto>>(result);
            return data;
        }
    }
}
