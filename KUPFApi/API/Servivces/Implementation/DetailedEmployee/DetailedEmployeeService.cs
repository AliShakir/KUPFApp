﻿using API.Common;
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

            return await PagedList<DetailedEmployeeDto>.CreateAsync(data,paginationParams.PageNumber, paginationParams.PageSize);
        }

        public async Task<string> AddEmployeeAsync(DetailedEmployeeDto detailedEmployeeDto)
        {
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
                return detailedEmployeeDto.EmployeeId;         
            }
            return string.Empty;
           
        }

        public async Task<string> UpdateEmployeeAsync(DetailedEmployeeDto detailedEmployeeDto)
        {
            if (_context != null)
            {
                var existingEmployee = _context.DetailedEmployees
                    .Where(c => c.EmployeeId == detailedEmployeeDto.EmployeeId).FirstOrDefault();

                if(existingEmployee != null)
                {
                    if(existingEmployee.CRUP_ID == 0 || existingEmployee.CRUP_ID == null)
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

        public async Task<int> AddTestUser(TestTableDto testTableDto)
        {
            if (_context != null)
            {
                var newRec = _mapper.Map<TestTable>(testTableDto);
                await _context.TestTables.AddAsync(newRec);
                await _context.SaveChangesAsync();
                return newRec.Id;
            }
            return 0;
        }

        public async Task<IEnumerable<TestTableDto>> GetUsers()
        {
            var data = await _context.TestTables.ToListAsync();
            var result = _mapper.Map<IEnumerable<TestTableDto>>(data);
            return result;
        }

        public async Task<TestTableDto> GetTestUserById(int id)
        {
            var data = await _context.TestTables.Where(c => c.Id == id).FirstOrDefaultAsync();
            var result = _mapper.Map<TestTableDto>(data);
            return result;
        }

        public async Task<int> GetUpdateTestUserById(TestTableDto testTableDto)
        {
            if (_context != null)
            {
                var existingUser = _mapper.Map<TestTable>(testTableDto);
                _context.TestTables.Update(existingUser);

                await _context.SaveChangesAsync();
                return testTableDto.Id;
            };
            return testTableDto.Id;
        }
    }
}
