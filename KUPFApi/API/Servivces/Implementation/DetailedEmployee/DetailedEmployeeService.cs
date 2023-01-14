using API.Common;
using API.DTOs;
using API.DTOs.EmployeeDto;
using API.Helpers;
using API.Models;
using API.Servivces.Interfaces.DetailedEmployee;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Servivces.Implementation.DetailedEmployee
{
    public class DetailedEmployeeService : IDetailedEmployeeService
    {
        private readonly KUPFDbContext _context;
        private readonly IMapper _mapper;
        public DetailedEmployeeService(KUPFDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<DetailedEmployeeDto> GetEmployeeByIdAsync(string id)
        {
            var result = await _context.DetailedEmployees.Where(c => c.EmployeeId == id).FirstOrDefaultAsync();
            var data = _mapper.Map<DetailedEmployeeDto>(result);
            return data;
        }

        public async Task<PagedList<DetailedEmployeeDto>> GetEmployeesAsync(PaginationParams paginationParams)
        {
            var data = (from e in _context.DetailedEmployees
                        join r in _context.Reftables
                     on e.Department equals r.Refid
                        where r.Reftype == "KUPF" && r.Refsubtype == "Department"
                        select new DetailedEmployeeDto
                        {
                            EmpCidNum = e.EmpCidNum,
                            Pfid = e.Pfid,
                            EmployeeId = e.EmployeeId,
                            MobileNumber = e.MobileNumber,
                            EnglishName = e.EnglishName,
                            ArabicName = e.ArabicName,
                            RefName1 = r.Refname1,
                            RefName2 = r.Refname2
                        })
                        .AsQueryable();

            return await PagedList<DetailedEmployeeDto>.CreateAsync(data, paginationParams.PageNumber, paginationParams.PageSize);
        }

        public async Task<string> AddEmployeeAsync(DetailedEmployeeDto detailedEmployeeDto)
        {
            string response = string.Empty;
            if (_context != null)
            {
                var crupId = _context.CrupMsts.Max(c => c.CrupId);
                var maxCrupId = crupId + 1;
                var newEmployee = _mapper.Map<Models.DetailedEmployee>(detailedEmployeeDto);
                newEmployee.LocationId = 1;
                newEmployee.CRUP_ID = maxCrupId;
                newEmployee.EmployeeId = CommonMethods.CreateEmployeeId().ToString();
                await _context.DetailedEmployees.AddAsync(newEmployee);
                await _context.SaveChangesAsync();
                //
                var auditInfo = _context.Reftables.FirstOrDefault(c => c.Reftype == "audit" && c.Refsubtype == "Employee");
                var crupAudit = new Crupaudit
                {
                    TenantId = detailedEmployeeDto.TenentId,
                    LocationId = detailedEmployeeDto.LocationId,
                    CrupId = maxCrupId, 
                    MySerial = (int)maxCrupId,
                    AuditNo = auditInfo.Refid,
                    AuditType = auditInfo.Shortname,
                    TableName = DbTableEnums.DetailedEmployee.ToString(),
                    FieldName = $"",
                    OldValue = "Non",
                    NewValue = "Inserted",
                    CreatedDate = DateTime.Now,
                    CreatedUserName = detailedEmployeeDto.Username
                };
                await _context.Crupaudits.AddAsync(crupAudit);
                await _context.SaveChangesAsync();
                return response = detailedEmployeeDto.EmployeeId;
                
            }
            return response;

        }

        public async Task<string> UpdateEmployeeAsync(DetailedEmployeeDto detailedEmployeeDto)
        {
            if (_context != null)
            {
                var existingEmployee = _context.DetailedEmployees
                    .Where(c => c.EmployeeId == detailedEmployeeDto.EmployeeId).FirstOrDefault();

                if (existingEmployee != null)
                {
                    if (existingEmployee.CRUP_ID == 0 || existingEmployee.CRUP_ID == null)
                    {
                        var crupId = _context.CrupMsts.Max(c => c.CrupId);
                        var maxCrupId = crupId + 1;
                        _mapper.Map(detailedEmployeeDto, existingEmployee);
                        existingEmployee.LocationId = 1;
                        existingEmployee.CRUP_ID = maxCrupId;
                        _context.DetailedEmployees.Update(existingEmployee);
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        _mapper.Map(detailedEmployeeDto, existingEmployee);
                        existingEmployee.LocationId = 1;
                        _context.DetailedEmployees.Update(existingEmployee);
                        await _context.SaveChangesAsync();
                    }

                }

                return detailedEmployeeDto.EmployeeId;
            };
            return string.Empty;
        }

        public async Task<int> DeleteEmployeeAsync(string id)
        {
            int result = 0;

            if (_context != null)
            {
                var employee = await _context.DetailedEmployees.FirstOrDefaultAsync(x => x.EmployeeId == id);

                if (employee != null)
                {
                    _context.DetailedEmployees.Remove(employee);

                    result = await _context.SaveChangesAsync();
                }
                return result;
            }
            return result;
        }
                

        public async Task<string> ValidateEmployeeData(DetailedEmployeeDto detailedEmployeeDto)
        {
            string response = string.Empty;
            if (_context != null)
            {
                // Validate Civil Id
                if (detailedEmployeeDto.EmpCidNum != null && !string.IsNullOrWhiteSpace(detailedEmployeeDto.EmpCidNum))
                {
                    var checkDuplicateCID = _context.DetailedEmployees.Where(c => c.TenentId == detailedEmployeeDto.TenentId
                    && c.LocationId == detailedEmployeeDto.LocationId && c.EmpCidNum == detailedEmployeeDto.EmpCidNum).FirstOrDefault();
                    if (checkDuplicateCID != null)
                    {
                        return response = "1"; // duplicate Civil Id
                    }
                }
                if (detailedEmployeeDto.MobileNumber != null && !string.IsNullOrWhiteSpace(detailedEmployeeDto.MobileNumber))
                {
                    var checkMobileNumber = _context.DetailedEmployees.Where(c => c.TenentId == detailedEmployeeDto.TenentId
                    && c.LocationId == detailedEmployeeDto.LocationId && c.MobileNumber == detailedEmployeeDto.MobileNumber).FirstOrDefault();
                    if (checkMobileNumber != null)
                    {
                        return response = "2"; // duplicate mobile number
                    }
                }
                if (detailedEmployeeDto.EmpWorkEmail != null && !string.IsNullOrWhiteSpace(detailedEmployeeDto.EmpWorkEmail))
                {
                    var checkEmpWorkEmail = _context.DetailedEmployees.Where(c => c.TenentId == detailedEmployeeDto.TenentId
                    && c.LocationId == detailedEmployeeDto.LocationId && c.EmpWorkEmail == detailedEmployeeDto.EmpWorkEmail).FirstOrDefault();
                    if (checkEmpWorkEmail != null)
                    {
                        return response = "3"; // duplicate email
                    }
                }
                return response = "0";
            }
            return response;
        }
    }
}
