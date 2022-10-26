using API.Common;
using API.DTOs;
using API.Models;
using API.Servivces.Interfaces;
using API.Servivces.Interfaces.FinancialServices;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Servivces.Implementation
{
    public class FinancialService : IFinancialService
    {
        private readonly KUPFDbContext _context;
        private readonly IMapper _mapper;
        public FinancialService(KUPFDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<string> AddFinancialServiceAsync(TransactionHdDto transactionHdDto)
        {
            if (_context != null)
            {
                var newTransaction = _mapper.Map<TransactionHd>(transactionHdDto);
                newTransaction.Mytransid = CommonMethods.CreateEmployeeId();
                await _context.TransactionHds.AddAsync(newTransaction);
                int myId = 1;
                for (int i = 0; i < transactionHdDto.Totinstallments; i++)
                {
                    var data = new TransactionDtDto
                    {
                        TenentId = transactionHdDto.TenentId,
                        LocationId = 1,
                        Mytransid = newTransaction.Mytransid,
                        Myid = myId,
                        EmployeeId = transactionHdDto.EmployeeId,
                        InstallmentNumber = 1,
                        InstallmentAmount = transactionHdDto.InstallmentAmount,
                        ReceivedAmount = 0,
                        PendingAmount = 0,
                        DiscountAmount = 0,
                        DiscountReference = string.Empty,
                        UniversityBatchNo = string.Empty,
                        ReceivedDate = DateTime.Now,
                    };
                    var transactionDt = _mapper.Map<TransactionDt>(data);
                    await _context.TransactionDts.AddAsync(transactionDt);
                    await _context.SaveChangesAsync();
                    _context.ChangeTracker.Clear();
                    myId++;
                }
                await _context.SaveChangesAsync();
                return newTransaction.Mytransid.ToString();
            }
            return string.Empty;
        }

        public async Task<int> DeleteFinancialServiceAsync(long id)
        {
            int result = 0;

            if (_context != null)
            {
                var transactionHd = await _context.TransactionHds.FirstOrDefaultAsync(x => x.Mytransid == id);
                var transactionDt = await _context.TransactionDts.Where(c=>c.Mytransid == id).ToListAsync();
                if (transactionHd != null)
                {
                    _context.TransactionHds.Remove(transactionHd);
                    _context.TransactionDts.RemoveRange(transactionDt);

                    result = await _context.SaveChangesAsync();
                }
                return result;
            }
            return result;
        }

        public async Task<string> UpdateFinancialServiceAsync(TransactionHdDto transactionHdDto)
        {
            if (_context != null)
            {
                var existingtransactionHd = _context.TransactionHds
                    .Where(c => c.Mytransid == transactionHdDto.Mytransid).FirstOrDefault();

                if (existingtransactionHd != null)
                {
                    _mapper.Map(transactionHdDto, existingtransactionHd);
                    existingtransactionHd.LocationId = 1;
                    _context.TransactionHds.Update(existingtransactionHd);
                    await _context.SaveChangesAsync();
                }

                return existingtransactionHd.Mytransid.ToString();
            };
            return string.Empty;
        }

        public async Task<IEnumerable<ReturnTransactionHdDto>> GetFinancialServiceAsync()
        {
            var data = (from e in _context.DetailedEmployees
                        join t in _context.TransactionHds
                        on Convert.ToInt32(e.EmployeeId) equals t.EmployeeId
                        select new ReturnTransactionHdDto
                        {
                            MYTRANSID = t.Mytransid,
                            EmployeeId = Convert.ToInt32(e.EmployeeId),
                            PFId = e.Pfid,
                            CID = e.EmpCidNum,
                            EnglishName = e.EnglishName,
                            ArabicName = e.ArabicName,
                            ServiceType = t.ServiceType,
                            Installment = t.InstallmentAmount,
                            Amount = t.AmtPaid,
                            Discounted = t.Discount,
                            PayDate = DateTime.Now.ToString("dd/MM/yyyy"),
                        }).ToList();
            return data;
        }

        public async Task<TransactionHdDto> GetFinancialServiceByIdAsync(long id)
        {
            var result = await _context.TransactionHds.FirstOrDefaultAsync(c => c.Mytransid == id);
            var data = _mapper.Map<TransactionHdDto>(result);
            return data;
        }

        public async Task<ServiceSetupDto> GetServiceByServiceTypeAndSubType(int serviceType, int serviceSubType, int tenentId)
        {
            var result = await _context.ServiceSetups.Where(c => c.ServiceType == serviceType && c.ServiceSubType == serviceSubType && c.TenentId == tenentId).FirstOrDefaultAsync();
            var data = _mapper.Map<ServiceSetupDto>(result);
            return data;
        }
    }
}
