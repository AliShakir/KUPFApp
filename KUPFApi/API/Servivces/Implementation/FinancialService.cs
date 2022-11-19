using API.Common;
using API.DTOs;
using API.DTOs.DropDown;
using API.DTOs.RefTable;
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

                var transactionHddApprovalsDto = new TransactionHddapprovalDetailDto()
                {
                    TenentId = newTransaction.TenentId,
                    Mytransid = newTransaction.Mytransid,
                    LocationId = (int)newTransaction.LocationId,
                    ServiceId = newTransaction.ServiceId,
                    EmployeeId = newTransaction.EmployeeId
                };
                var transactionHddApprovals = _mapper.Map<TransactionHddapprovalDetail>(transactionHddApprovalsDto);
                await _context.TransactionHddapprovalDetails.AddAsync(transactionHddApprovals);

                int myId = 1;
                for (int i = 0; i < transactionHdDto.Totinstallments; i++)
                {
                    decimal eachInstallmentAmount = (decimal)(transactionHdDto.InstallmentAmount / transactionHdDto.Totinstallments);
                    var data = new TransactionDtDto
                    {
                        TenentId = transactionHdDto.TenentId,
                        LocationId = 1,
                        Mytransid = newTransaction.Mytransid,
                        Myid = myId,
                        EmployeeId = transactionHdDto.EmployeeId,
                        InstallmentNumber = 1,
                        InstallmentAmount = eachInstallmentAmount,
                        ReceivedAmount = 0,
                        PendingAmount = 0,
                        DiscountAmount = 0,
                        DiscountReference = string.Empty,
                        UniversityBatchNo = string.Empty,
                        ReceivedDate = DateTime.Now,
                        InstallmentsBegDate = transactionHdDto.InstallmentsBegDate,
                        UntilMonth = transactionHdDto.UntilMonth

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
                var transactionDt = await _context.TransactionDts.Where(c => c.Mytransid == id).ToListAsync();
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

        public async Task<ReturnSingleFinancialServiceById> GetFinancialServiceByIdAsync(long id)
        {
            var result = (from e in _context.DetailedEmployees
                          join t in _context.TransactionHds
                          on Convert.ToInt32(e.EmployeeId) equals t.EmployeeId
                          where t.Mytransid == id
                          select new ReturnSingleFinancialServiceById
                          {
                              Mytransid = t.Mytransid,
                              EmployeeId = e.EmployeeId,
                              Pfid = e.Pfid,
                              EmpCidNum = e.EmpCidNum,
                              EnglishName = e.EnglishName,
                              ArabicName = e.ArabicName,
                              EmpBirthday = e.EmpBirthday,
                              EmpGender = e.EmpGender,
                              JoinedDate = e.JoinedDate,
                              EmpMaritalStatus = e.EmpMaritalStatus,
                              NationName = e.NationName,
                              ContractType = e.ContractType,
                              Department = e.Department,
                              DepartmentName = e.DepartmentName,
                              Salary = e.Salary,
                              MobileNumber = e.MobileNumber,
                              EmpWorkTelephone = e.EmpWorkTelephone,
                              Remarks = e.Remarks,
                              ServiceType = t.ServiceType,
                              ServiceSubType = t.ServiceSubType,
                              Totamt = t.Totamt,
                              Totinstallments = t.Totinstallments,
                              InstallmentAmount = t.InstallmentAmount,
                              LoanAct = t.LoanAct,
                              HajjAct = t.HajjAct,
                              PersLoanAct = t.PersLoanAct,
                              ConsumerLoanAct = t.ConsumerLoanAct,
                              OtherAct1 = t.OtherAct1,
                              OtherAct2 = t.OtherAct2,
                              OtherAct3 = t.OtherAct3,
                              OtherAct4 = t.OtherAct4,
                              OtherAct5 = t.OtherAct5,

                              SerApproval1 = t.SerApproval1,
                              ApprovalBy1 = t.ApprovalBy1,
                              ApprovedDate1 = t.ApprovedDate1,

                              SerApproval2 = t.SerApproval2,
                              ApprovalBy2 = t.ApprovalBy2,
                              ApprovedDate2 = t.ApprovedDate2,

                              SerApproval3 = t.SerApproval3,
                              ApprovalBy3 = t.ApprovalBy3,
                              ApprovedDate3 = t.ApprovedDate3,

                              SerApproval4 = t.SerApproval4,
                              ApprovalBy4 = t.ApprovalBy4,
                              ApprovedDate4 = t.ApprovedDate4,

                              SerApproval5 = t.SerApproval5,
                              ApprovalBy5 = t.ApprovalBy5,
                              ApprovedDate5 = t.ApprovedDate5,
                              InstallmentsBegDate = t.InstallmentsBegDate,
                              UntilMonth = t.UntilMonth
                          }).FirstOrDefault();
            return result;
        }

        public async Task<ServiceSetupDto> GetServiceByServiceTypeAndSubType(int serviceType, int serviceSubType, int tenentId)
        {
            var result = await _context.ServiceSetups.Where(c => c.ServiceType == serviceType && c.ServiceSubType == serviceSubType && c.TenentId == tenentId).FirstOrDefaultAsync();
            var data = _mapper.Map<ServiceSetupDto>(result);
            return data;
        }

        public async Task<IEnumerable<ReturnServiceApprovals>> GetServiceApprovalsAsync()
        {
            var data = (from e in _context.DetailedEmployees
                        join hd in _context.TransactionHds
                        on Convert.ToInt32(e.EmployeeId) equals hd.EmployeeId
                        join app in _context.TransactionHddapprovalDetails
                        on hd.Mytransid equals app.Mytransid
                        select new ReturnServiceApprovals
                        {
                            MyTransId = (int)hd.Mytransid,
                            EmployeeId = Convert.ToInt32(e.EmployeeId),
                            EnglishName = e.EnglishName,
                            ArabicName = e.ArabicName,
                            Services = hd.ServiceId.ToString(),
                            Source = "Online",
                            TotalInstallments = (int)hd.Totinstallments,
                            Amount = (decimal)hd.InstallmentAmount,
                            Discounted = hd.Discount.ToString(),
                            InstallmentBeginDate = hd.InstallmentsBegDate,
                            UntilMonth = hd.UntilMonth
                        }).ToList();
            return data;

        }

        public async Task<string> ApproveServiceAsync(ApproveRejectServiceDto approveRejectServiceDto)
        {
            int result = 0;
            if (_context != null)
            {
                var existingtransactionHd = _context.TransactionHddapprovalDetails
                    .Where(c => c.Mytransid == approveRejectServiceDto.Mytransid).FirstOrDefault();

                if (existingtransactionHd != null)
                {
                    if (!string.IsNullOrWhiteSpace(existingtransactionHd.ApprovalRemarks))
                    {
                        result = 0;
                    }
                    else
                    {
                        existingtransactionHd.Mytransid = approveRejectServiceDto.Mytransid;
                        existingtransactionHd.Userid = approveRejectServiceDto.Userid;
                        existingtransactionHd.ApprovalDate = approveRejectServiceDto.ApprovalDate;
                        existingtransactionHd.Entrydate = approveRejectServiceDto.Entrydate;
                        existingtransactionHd.Entrytime = approveRejectServiceDto.Entrytime;
                        existingtransactionHd.Status = "Approved";
                        existingtransactionHd.ApprovalRemarks = approveRejectServiceDto.ApprovalRemarks;
                        _context.TransactionHddapprovalDetails.Update(existingtransactionHd);
                        result = await _context.SaveChangesAsync();
                    }
                }
                return result.ToString();
            }
            return result.ToString();
        }

        public async Task<IEnumerable<RefTableDto>> GetRejectionType()
        {
            var result = await _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "Rejection").ToListAsync();
            var data = _mapper.Map<IEnumerable<RefTableDto>>(result);
            return data;
        }

        public async Task<string> RejectServiceAsync(ApproveRejectServiceDto approveRejectServiceDto)
        {
            int result = 0;
            if (_context != null)
            {
                var existingtransactionHd = _context.TransactionHddapprovalDetails
                    .Where(c => c.Mytransid == approveRejectServiceDto.Mytransid).FirstOrDefault();

                if (existingtransactionHd != null)
                {
                    existingtransactionHd.Mytransid = approveRejectServiceDto.Mytransid;
                    existingtransactionHd.Userid = approveRejectServiceDto.Userid;
                    existingtransactionHd.ApprovalDate = approveRejectServiceDto.ApprovalDate;
                    existingtransactionHd.Entrydate = approveRejectServiceDto.Entrydate;
                    existingtransactionHd.Entrytime = approveRejectServiceDto.Entrytime;
                    existingtransactionHd.Status = "Rejected";
                    existingtransactionHd.RejectionRemarks = approveRejectServiceDto.RejectionRemarks;
                    existingtransactionHd.RejectionType = approveRejectServiceDto.RejectionType;
                    _context.TransactionHddapprovalDetails.Update(existingtransactionHd);
                    result = await _context.SaveChangesAsync();

                }
                return result.ToString();
            }
            return result.ToString();
        }

        public async Task<IEnumerable<ReturnServiceApprovals>> GetServiceApprovalsByEmployeeId(string employeeId)
        {
            var data = (from e in _context.DetailedEmployees
                        join hd in _context.TransactionHds
                        on Convert.ToInt32(e.EmployeeId) equals hd.EmployeeId
                        join app in _context.TransactionHddapprovalDetails
                        on hd.Mytransid equals app.Mytransid
                        where e.EmployeeId == employeeId
                        select new ReturnServiceApprovals
                        {
                            MyTransId = (int)hd.Mytransid,
                            EmployeeId = Convert.ToInt32(e.EmployeeId),
                            EnglishName = e.EnglishName,
                            ArabicName = e.ArabicName,
                            Services = hd.ServiceId.ToString(),
                            Source = "Online",
                            TotalInstallments = (int)hd.Totinstallments,
                            Amount = (decimal)hd.InstallmentAmount,
                            Discounted = hd.Discount.ToString(),
                            InstallmentBeginDate = hd.InstallmentsBegDate,
                            UntilMonth = hd.UntilMonth,
                            ServiceType = hd.ServiceType,
                            ServiceSubType = hd.ServiceSubType,
                            TotalAmount = hd.Totamt

                        }).ToList();
            return data;
        }

        public async Task<IEnumerable<ReturnServiceApprovalDetails>> GetServiceApprovalDetailByTransId(int transId)
        {
            var data = (from hd in _context.TransactionHds
                        join dt in _context.TransactionDts
                        on hd.Mytransid equals dt.Mytransid
                        where hd.Mytransid == transId
                        select new ReturnServiceApprovalDetails
                        {
                            MyTransId = (int)hd.Mytransid,
                            MyId = dt.Myid,
                            InstallmentAmount = dt.InstallmentAmount,
                            PendingAmount = dt.PendingAmount,
                            ReceivedAmount = dt.ReceivedAmount,
                            DiscountedAmount = dt.DiscountAmount
                        }).ToList();
            return data;
        }

        public async Task<IEnumerable<SelectServiceTypeDto>> GetServiceType(int tenentId)
        {
            var result = await _context.Reftables.Where(c => c.Refsubtype == "ServiceType").ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectServiceTypeDto>>(result);
            return data;
        }

        public async Task<int> MakeFinancialTransactionAsync(CostCenterDto costCenterDto)
        {
            int result = 0;
            if (_context != null)
            {                
                var newTransaction = _mapper.Map<CostCenter>(costCenterDto);
                await _context.CostCenters.AddAsync(newTransaction);
                result = await _context.SaveChangesAsync();
                
            }
            return result;
        }
    }
}
