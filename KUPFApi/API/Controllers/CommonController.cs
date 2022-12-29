﻿using API.DTOs;
using API.DTOs.DropDown;
using API.DTOs.EmployeeDto;
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
        /// <summary>
        /// This api will get all Occupations from RefTable
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetOccupations")]
        public async Task<IEnumerable<SelectOccupationDto>> GetOccupations()
        {
            var result = await _commonServiceService.GetOccupationsAsync();
            return result;
        }
        /// <summary>
        /// This api will get all Departments from RefTable
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetDepartments")]
        public async Task<IEnumerable<SelectDepartmentDto>> GetDepartments()
        {
            var result = await _commonServiceService.GetDepartmentsAsync();
            return result;
        }
        /// <summary>
        /// This api will get termination list from RefTable
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetTerminations")]
        public async Task<IEnumerable<SelectTerminationDto>> GetTerminations()
        {
            var result = await _commonServiceService.GetTerminationsAsync();
            return result;
        }
        /// <summary>
        /// This api will get Hajj Loan Account from ServiceSetup
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetHajjLoans")]
        public async Task<IEnumerable<SelectHajjLoanDto>> GetHajjLoans()
        {
            var result = await _commonServiceService.GetHajjLoanAsync();
            return result;
        }
        /// <summary>
        /// This api will get Consumer Loan Account from ServiceSetup
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetConsumerLoanAct")]
        public async Task<IEnumerable<SelectConsumerLoanActDto>> GetConsumerLoanAct()
        {
            var result = await _commonServiceService.GetConsumerLoanActAsync();
            return result;
        }
        /// <summary>
        /// This api will get Loan Account from ServiceSetup
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetLoanAct")]
        public async Task<IEnumerable<SelectLoanActDto>> GetLoanAct()
        {
            var result = await _commonServiceService.GetLoanActAsync();
            return result;
        }
        /// <summary>
        /// This api will get Personal Loan Account from ServiceSetup
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetPerLoanAct")]
        public async Task<IEnumerable<SelectPerLoanActDto>> GetPerLoanAct()
        {
            var result = await _commonServiceService.GetPerLoanActAsync();
            return result;
        }
        /// <summary>
        /// This api will get Other Loan Account 1 from ServiceSetup
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetOtherAcc1")]
        public async Task<IEnumerable<SelectOtherAct1Dto>> GetOtherAcc1()
        {
            var result = await _commonServiceService.GetOtherAcc1Async();
            return result;
        }
        /// <summary>
        /// This api will get Other Loan Account 2 from ServiceSetup
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetOtherAcc2")]
        public async Task<IEnumerable<SelectOtherAct2Dto>> GetOtherAcc2()
        {
            var result = await _commonServiceService.GetOtherAcc2Async();
            return result;
        }
        /// <summary>
        /// This api will get Other Loan Account 3 from ServiceSetup
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetOtherAcc3")]
        public async Task<IEnumerable<SelectOtherAct3Dto>> GetOtherAcc3()
        {
            var result = await _commonServiceService.GetOtherAcc3Async();
            return result;
        }
        /// <summary>
        /// This api will get Other Loan Account 4 from ServiceSetup
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetOtherAcc4")]
        public async Task<IEnumerable<SelectOtherAct4Dto>> GetOtherAcc4()
        {
            var result = await _commonServiceService.GetOtherAcc4Async();
            return result;
        }
        /// <summary>
        /// Api to Verify Account Employee/Client Account.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("VerifyAccount/{accountNo}")]
        public async Task<IEnumerable<CoaDto>> VerifyAccount(Int64 accountNo)
        {
            var result = await _commonServiceService.VerifyAccount(accountNo);
            return result;
        }
        /// <summary>
        /// Api to get all Users from UserMst
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetUsers")]
        public async Task<IEnumerable<SelectUserDto>> GetUsers()
        {
            var result = await _commonServiceService.GetUsers();
            return result;
        }
        /// <summary>
        /// Api to get master Id from FUNCTION_USER
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetMasterId")]
        public async Task<IEnumerable<SelectMasterIdDto>> GetMasterId()
        {
            var result = await _commonServiceService.GetMasterId();
            return result;
        }
        /// <summary>
        /// Api to get RefType from RefTable
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetRefType")]
        public async Task<IEnumerable<SelectRefTypeDto>> GetRefType()
        {
            var result = await _commonServiceService.GetRefType();
            return result;
        }
        /// <summary>
        /// Api to get RefSubType from RefTable
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetRefSubType")]
        public async Task<IEnumerable<SelectRefSubTypeDto>> GetRefSubType()
        {
            var result = await _commonServiceService.GetRefSubType();
            return result;
        }
        /// <summary>
        /// Api to get RefSubType by RefType from RefTable
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetRefSubTypeByRefType/{refType}")]
        public async Task<IEnumerable<SelectRefSubTypeDto>> GetRefSubTypeByRefType(string refType)
        {
            var result = await _commonServiceService.GetRefSubTypeByRefType(refType);
            return result;
        }
        /// <summary>
        /// Api to get service by Master Ids. This will get array of master Ids
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("GetServiceTypeByMasterIds")]
        public async Task<IEnumerable<SelectServiceTypeDto>> GetServiceTypeByMasterIds(int[] masterIds)
        {
            var result = await _commonServiceService.GetServiceTypeByMasterIds(masterIds);
            return result;
        }
        /// <summary>
        /// Api to get service sub type.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetServiceSubType/{switchNo}")]
        public async Task<IEnumerable<SelectServiceSubTypeDto>> GetServiceSubType(string switchNo)
        {
            var result = await _commonServiceService.GetServiceSubType(switchNo);
            return result;
        }
        /// <summary>
        /// Api to get master service type.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetMasterServiceType")]
        public async Task<IEnumerable<SelectMasterServiceTypeDto>> GetMasterServiceType()
        {
            var result = await _commonServiceService.GetMasterGetServiceType();
            return result;
        }
        /// <summary>
        /// Api to get Min Month Of Services from service setups
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetMinMonthOfServices")]
        public async Task<IEnumerable<SelectMinMonthOfServicesDto>> GetMinMonthOfServices()
        {
            var result = await _commonServiceService.GetMinMonthOfServices();
            return result;
        }
        /// <summary>
        /// Api to get Min Installments from service setups
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetMinInstallments")]
        public async Task<IEnumerable<SelectMinInstallmentDto>> GetMinInstallments()
        {
            var result = await _commonServiceService.GetMinInstallments();
            return result;
        }
        /// <summary>
        /// Api to get Max Installments from service setups
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetMaxInstallments")]
        public async Task<IEnumerable<SelectMaxInstallmentDto>> GetMaxInstallments()
        {
            var result = await _commonServiceService.GetMaxInstallments();
            return result;
        }
        /// <summary>
        /// Api to get Approval Roles.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetApprovalRoles")]
        public async Task<IEnumerable<SelectApprovalRoleDto>> GetApprovalRoles()
        {
            var result = await _commonServiceService.GetApprovalRoles();
            return result;
        }
        /// <summary>
        /// Api to search employee by EmployyeId,PFId,CId
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("SearchEmployee")]
        public async Task<DetailedEmployeeDto> SearchEmployee(SearchEmployeeDto searchEmployeeDto)
        {
            var result = await _commonServiceService.SearchEmployee(searchEmployeeDto);
            return result;
        }
        /// <summary>
        /// Api to get selected service type
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetSelectedServiceType")]
        public async Task<IEnumerable<SelectedServiceTypeDto>> GetSelectedServiceType(int tenentId)
        {
            var result = await _commonServiceService.GetSelectedServiceType(tenentId);
            return result;
        }
        /// <summary>
        /// Api to get selected service sub type...
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetSelectedServiceSubType")]
        public async Task<IEnumerable<SelectedServiceSubTypeDto>> GetSelectedServiceSubType(int tenentId)
        {
            var result = await _commonServiceService.GetSelectedServiceSubType(tenentId);
            return result;
        }
        /// <summary>
        /// Api to get service type...
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetServiceType")]
        public async Task<IEnumerable<SelectServiceTypeDto>> GetServiceType(int tenentId)
        {
            var result = await _commonServiceService.GetServiceType(tenentId);
            return result;
        }
        /// <summary>
        /// Api to get sub service type by service type 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetSubServiceTypeByServiceType")]
        public async Task<IEnumerable<SelectServiceTypeDto>> GetSubServiceTypeByServiceType(int tenentId, int refId)
        {
            var result = await _commonServiceService.GetSubServiceTypeByServiceType(tenentId, refId);
            return result;
        }
        /// <summary>
        /// Api to get doc types
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetDocTypes")]
        public async Task<IEnumerable<SelectServiceTypeDto>> GetDocTypes(int tenentId)
        {
            var result = await _commonServiceService.GetDocTypes(tenentId);
            return result;
        }
    }
}
