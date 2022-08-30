using API.DTOs;
using API.DTOs.DropDown;
using API.Models;
using API.Servivces.Interfaces;
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
    public class CommonController : ControllerBase
    {
        private readonly KUPFDbContext _context;
        private readonly ICommonService _commonServiceService;
        public IMapper _mapper;
        public CommonController(KUPFDbContext context, ICommonService commonServiceService, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _commonServiceService = commonServiceService;
        }
        [HttpGet]
        [Route("GetOccupations")]
        public async Task<IEnumerable<SelectOccupationDto>> GetOccupations()
        {
            var result = await _commonServiceService.GetOccupationsAsync();
            return result;
        }
        [HttpGet]
        [Route("GetDepartments")]
        public async Task<IEnumerable<SelectDepartmentDto>> GetDepartments()
        {
            var result = await _commonServiceService.GetDepartmentsAsync();
            return result;
        }
        [HttpGet]
        [Route("GetTerminations")]
        public async Task<IEnumerable<SelectTerminationDto>> GetTerminations()
        {
            var result = await _commonServiceService.GetTerminationsAsync();
            return result;
        }
        [HttpGet]
        [Route("GetHajjLoans")]
        public async Task<IEnumerable<SelectHajjLoanDto>> GetHajjLoans()
        {
            var result = await _commonServiceService.GetHajjLoanAsync();
            return result;
        }
        [HttpGet]
        [Route("GetConsumerLoanAct")]
        public async Task<IEnumerable<SelectConsumerLoanActDto>> GetConsumerLoanAct()
        {
            var result = await _commonServiceService.GetConsumerLoanActAsync();
            return result;
        }
        [HttpGet]
        [Route("GetLoanAct")]
        public async Task<IEnumerable<SelectLoanActDto>> GetLoanAct()
        {
            var result = await _commonServiceService.GetLoanActAsync();
            return result;
        }
        [HttpGet]
        [Route("GetPerLoanAct")]
        public async Task<IEnumerable<SelectPerLoanActDto>> GetPerLoanAct()
        {
            var result = await _commonServiceService.GetPerLoanActAsync();
            return result;
        }
        [HttpGet]
        [Route("GetOtherAcc1")]
        public async Task<IEnumerable<SelectOtherAct1Dto>> GetOtherAcc1()
        {
            var result = await _commonServiceService.GetOtherAcc1Async();
            return result;
        }
        [HttpGet]
        [Route("GetOtherAcc2")]
        public async Task<IEnumerable<SelectOtherAct2Dto>> GetOtherAcc2()
        {
            var result = await _commonServiceService.GetOtherAcc2Async();
            return result;
        }
        [HttpGet]
        [Route("GetOtherAcc3")]
        public async Task<IEnumerable<SelectOtherAct3Dto>> GetOtherAcc3()
        {
            var result = await _commonServiceService.GetOtherAcc3Async();
            return result;
        }
        [HttpGet]
        [Route("GetOtherAcc4")]
        public async Task<IEnumerable<SelectOtherAct4Dto>> GetOtherAcc4()
        {
            var result = await _commonServiceService.GetOtherAcc4Async();
            return result;
        }
        
        [HttpGet]
        [Route("VerifyAccount/{accountNo}")]
        public async Task<IEnumerable<CoaDto>> VerifyAccount(Int64 accountNo)
        {
            var result = await _commonServiceService.VerifyAccount(accountNo);
            return result;
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<IEnumerable<SelectUserDto>> GetUsers()
        {
            var result = await _commonServiceService.GetUsers();
            return result;
        }
        [HttpGet]
        [Route("GetMasterId")]
        public async Task<IEnumerable<SelectMasterIdDto>> GetMasterId()
        {
            var result = await _commonServiceService.GetMasterId();
            return result;
        }
    }
}
