using API.DTOs;
using API.DTOs.DropDown;
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
        public CommonService(KUPFDbContext context,IMapper mapper)
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
                .Where(c=>c.Refsubtype== "Occupation" && c.Reftype =="KUPF" && c.TenentId == 21)
                .OrderBy(x=>x.Refsubtype).ToListAsync();
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
            var result = await _context.Coas.Where(c =>c.AccountNumber == accountNo && c.HeadId == 5).ToListAsync();
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
    }
}
