using API.Common;
using API.DTOs;
using API.DTOs.DropDown;
using API.DTOs.FinancialTransaction;
using API.DTOs.RefTable;
using API.Models;
using API.Servivces.Interfaces;
using API.Servivces.Interfaces.FinancialServices;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace API.Servivces.Implementation
{
    public class FinancialService : IFinancialService
    {
        private readonly KUPFDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFinancialTransactionService _IFinancialTransactionService;
        public FinancialService(KUPFDbContext context, IMapper mapper, IFinancialTransactionService IFinancialTransactionService)
        {
            _context = context;
            _mapper = mapper;
            _IFinancialTransactionService = IFinancialTransactionService;
        }
        public async Task<string> AddFinancialServiceAsync(TransactionHdDto transactionHdDto)
        {
            if (_context != null)
            {                
                
                string response = string.Empty;
                var newTransaction = _mapper.Map<TransactionHd>(transactionHdDto);

                if (transactionHdDto.IsKUEmployee != true)
                {
                    return response = "1";
                }
                else if (transactionHdDto.IsOnSickLeave == true)
                {
                    return response = "2";
                }
                else if (transactionHdDto.IsMemberOfFund == true)
                {
                    return response = "3";
                }
                //else if (transactionHdDto.TerminationId != null)
                //{
                //    return response = "4";
                //}
                else
                {
                    //
                    //int maxSwitch1 = _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "ServicesSubType"
                    //&& c.Switch4 == transactionHdDto.ServiceType && c.Refid == transactionHdDto.ServiceSubType).Max(x => Convert.ToInt32(x.Switch1));
                    int maxSwitch = 1;
                    //

                    newTransaction.Mytransid = CommonMethods.CreateEmployeeId();
                    newTransaction.MasterServiceId = maxSwitch;
                    await _context.TransactionHds.AddAsync(newTransaction);
                    await _context.SaveChangesAsync();

                    var serviceApprovals = _context.ServiceSetups.Where(p => p.ServiceType == 2 && p.ServiceSubType == 5).FirstOrDefault();
                    List<string> myService = new List<string>
                    {
                        serviceApprovals.SerApproval1,
                        serviceApprovals.SerApproval2,
                        serviceApprovals.SerApproval3,
                        serviceApprovals.SerApproval4,
                        serviceApprovals.SerApproval5
                    };
                    if (serviceApprovals != null)
                    {
                        int srId = 0;
                        for (int i = 0; i < myService.Count; i++) // myservice is one active  = true else false.
                        {
                            if (myService[i] != "" && myService[i] != "0") // 
                            {
                                var transactionHddApprovalsDto = new TransactionHddapprovalDetailDto()
                                {
                                    TenentId = newTransaction.TenentId,
                                    Mytransid = newTransaction.Mytransid,
                                    LocationId = (int)newTransaction.LocationId,
                                    SerApprovalId = srId + 1,
                                    SerApproval = myService[i].ToString(),
                                    EmployeeId = newTransaction.EmployeeId,
                                    ServiceId = srId + 1,
                                    MasterServiceId = maxSwitch,
                                    ApprovalDate = null,
                                    RejectionType = null,
                                    RejectionRemarks = null,
                                    AttachId = null,
                                    Status = "ManagerApproval",
                                    CrupId = 1,
                                    Userid = newTransaction.Userid,
                                    Active = true,
                                    Entrydate = DateTime.Now,
                                    Entrytime = DateTime.Now,
                                    Updttime = DateTime.Now,
                                    ApprovalRemarks = "BySystem"
                                };
                                //
                                var transactionHddApprovals = _mapper.Map<TransactionHddapprovalDetail>(transactionHddApprovalsDto);
                                transactionHddApprovals.MasterServiceId = maxSwitch;
                                await _context.TransactionHddapprovalDetails.AddAsync(transactionHddApprovals);
                            }
                            await _context.SaveChangesAsync();
                            _context.ChangeTracker.Clear();
                            srId++;
                        }
                    }
                    int myId = 1;
                    if (transactionHdDto.ServiceType == "Subscriber  - مشترك")
                    {
                        int installments = CommonMethods.CreateSubscriberInstallments(transactionHdDto.InstallmentsBegDate);
                        for (int i = 0; i < installments; i++)
                        {
                            //decimal eachInstallmentAmount = (decimal)(transactionHdDto.InstallmentAmount / transactionHdDto.Totinstallments);
                            var data = new TransactionDtDto
                            {
                                TenentId = transactionHdDto.TenentId,
                                LocationId = transactionHdDto.LocationId,
                                Mytransid = newTransaction.Mytransid,
                                Myid = myId,
                                EmployeeId = transactionHdDto.EmployeeId,
                                InstallmentNumber = 1,//Create a method to create subscription and this should be starts from currnet month + next year....
                                AttachId = 0,
                                PeriodCode = GetPeriodCode(),// comes from TBLPeriods table.
                                InstallmentAmount = transactionHdDto.InstallmentAmount,
                                ReceivedAmount = 0,
                                PendingAmount = transactionHdDto.InstallmentAmount,
                                DiscountAmount = 0,
                                DiscountReference = string.Empty,
                                UniversityBatchNo = string.Empty,
                                ReceivedDate = null,
                                EffectedAccount = null,
                                OtherReference = null,
                                Activityid = null,
                                CrupId = 1,
                                Glpost = "1",
                                Glpost1 = null,
                                Glpostref = "1",
                                Glpostref1 = "1",
                                Active = true,
                                Switch1 = null,
                                DelFlag = null,
                                InstallmentsBegDate = transactionHdDto.InstallmentsBegDate,
                                UntilMonth = transactionHdDto.UntilMonth
                            };
                            var transactionDt = _mapper.Map<TransactionDt>(data);
                            await _context.TransactionDts.AddAsync(transactionDt);
                            await _context.SaveChangesAsync();
                            _context.ChangeTracker.Clear();
                            myId++;
                        }
                        //var attachId = _context.TransactionHddms.Where(c => c.TenentId == transactionHdDto.TenentId).Max(c => c.AttachId);
                        var attachId = _context.TransactionHddms.FromSqlRaw("select isnull(Max(AttachID+1),1) as attachId from  [TransactionHDDMS ] where TenentID='" + transactionHdDto.TenentId + "'").Select(p => p.AttachId).FirstOrDefault(); ;
                        var serialNo = _context.TransactionHddms.FromSqlRaw("select isnull(Max(Serialno+1),1) as serialNo from  [TransactionHDDMS ] where tenentId='" + transactionHdDto.TenentId+"' and attachid=1").Select(c => c.Serialno).FirstOrDefault();

                        var attachmentsData = new TransactionHddm
                        {
                            TenentId =(int)transactionHdDto.TenentId,
                            Mytransid = newTransaction.Mytransid,
                            AttachId = attachId
                            
                        };

                        var path = "E:\\";
                        
                        if (transactionHdDto.personalPhotoDocument.Length != 0 && 
                            transactionHdDto.personalPhotoDocument != null)
                        {
                            var personalDocFileExtension = Path.GetExtension(transactionHdDto.personalPhotoDocument.FileName);
                            var filePath = Path.Combine(path, Guid.NewGuid() + personalDocFileExtension);
                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                transactionHdDto.personalPhotoDocument.CopyTo(stream);
                            }
                            attachmentsData.Serialno = serialNo;
                            attachmentsData.DocumentType = transactionHdDto.personalPhotoDocType;                           
                            attachmentsData.AttachmentPath = filePath;
                            attachmentsData.AttachmentByName = Guid.NewGuid() + personalDocFileExtension;
                            attachmentsData.AttachmentsDetail = null;
                            await _context.TransactionHddms.AddAsync(attachmentsData);
                            await _context.SaveChangesAsync();
                            _context.ChangeTracker.Clear();
                        }
                        if (transactionHdDto.appplicationFileDocument.Length != 0 &&
                            transactionHdDto.appplicationFileDocument != null)
                        {
                            var appplicationFileExtension = Path.GetExtension(transactionHdDto.appplicationFileDocument.FileName);
                            var filePath = Path.Combine(path, Guid.NewGuid() + appplicationFileExtension);
                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                transactionHdDto.appplicationFileDocument.CopyTo(stream);
                            }
                            attachmentsData.Serialno = attachmentsData.Serialno + 1;
                            attachmentsData.DocumentType = transactionHdDto.appplicationFileDocType;
                            attachmentsData.AttachmentPath = filePath;
                            attachmentsData.AttachmentByName = Guid.NewGuid() + appplicationFileExtension;
                            attachmentsData.AttachmentsDetail = null;
                            await _context.TransactionHddms.AddAsync(attachmentsData);
                            await _context.SaveChangesAsync();
                            _context.ChangeTracker.Clear();
                        }
                        if (transactionHdDto.workIdDocument.Length != 0 &&
                            transactionHdDto.workIdDocument != null)
                        {
                            var workIdFileExtension = Path.GetExtension(transactionHdDto.workIdDocument.FileName);
                            var filePath = Path.Combine(path, Guid.NewGuid() + workIdFileExtension);
                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                transactionHdDto.workIdDocument.CopyTo(stream);
                            }
                            attachmentsData.Serialno = attachmentsData.Serialno + 1;
                            attachmentsData.DocumentType = transactionHdDto.workIdDocType;
                            attachmentsData.AttachmentPath = filePath;
                            attachmentsData.AttachmentByName = Guid.NewGuid() + workIdFileExtension;
                            attachmentsData.AttachmentsDetail = null;
                            await _context.TransactionHddms.AddAsync(attachmentsData);
                            await _context.SaveChangesAsync();
                            _context.ChangeTracker.Clear();
                        }
                        if (transactionHdDto.civilIdDocument.Length != 0 &&
                            transactionHdDto.civilIdDocument != null)
                        {
                            var civilIdFileExtension = Path.GetExtension(transactionHdDto.civilIdDocument.FileName);
                            var filePath = Path.Combine(path, Guid.NewGuid() + civilIdFileExtension);
                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                transactionHdDto.civilIdDocument.CopyTo(stream);
                            }
                            attachmentsData.Serialno = attachmentsData.Serialno + 1;
                            attachmentsData.DocumentType = transactionHdDto.workIdDocType;
                            attachmentsData.AttachmentPath = filePath;
                            attachmentsData.AttachmentByName = Guid.NewGuid() + civilIdFileExtension;
                            attachmentsData.AttachmentsDetail = null;
                            await _context.TransactionHddms.AddAsync(attachmentsData);
                            await _context.SaveChangesAsync();
                            _context.ChangeTracker.Clear();
                        }
                        if (transactionHdDto.salaryDataDocument.Length != 0 &&
                            transactionHdDto.salaryDataDocument != null)
                        {
                            var salaryDataFileExtension = Path.GetExtension(transactionHdDto.salaryDataDocument.FileName);
                            var filePath = Path.Combine(path, Guid.NewGuid() + salaryDataFileExtension);
                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                transactionHdDto.salaryDataDocument.CopyTo(stream);
                            }
                            attachmentsData.Serialno = attachmentsData.Serialno + 1;
                            attachmentsData.DocumentType = transactionHdDto.salaryDataDocType;
                            attachmentsData.AttachmentPath = filePath;
                            attachmentsData.AttachmentByName = Guid.NewGuid() + salaryDataFileExtension;
                            attachmentsData.AttachmentsDetail = null;
                            await _context.TransactionHddms.AddAsync(attachmentsData);
                            await _context.SaveChangesAsync();
                            _context.ChangeTracker.Clear();
                        }
                    }
                    else
                    {
                        // int myId = 1;
                        for (int i = 0; i < transactionHdDto.Totinstallments; i++)
                        {
                            decimal eachInstallmentAmount = (decimal)(transactionHdDto.InstallmentAmount / transactionHdDto.Totinstallments);
                            var data = new TransactionDtDto
                            {
                                TenentId = transactionHdDto.TenentId,
                                LocationId = transactionHdDto.LocationId,
                                Mytransid = newTransaction.Mytransid,
                                Myid = myId,
                                EmployeeId = transactionHdDto.EmployeeId,
                                InstallmentNumber = 1,//Create a method to create subscription and this should be starts from currnet month + next year....
                                AttachId = 0,
                                PeriodCode = GetPeriodCode(),// comes from TBLPeriods table.
                                InstallmentAmount = eachInstallmentAmount,
                                ReceivedAmount = 0,
                                PendingAmount = transactionHdDto.InstallmentAmount,
                                DiscountAmount = 0,
                                DiscountReference = string.Empty,
                                UniversityBatchNo = string.Empty,
                                ReceivedDate = null,
                                EffectedAccount = null,
                                OtherReference = null,
                                Activityid = null,
                                CrupId = 1,
                                Glpost = "1",
                                Glpost1 = null,
                                Glpostref = "1",
                                Glpostref1 = "1",
                                Active = true,
                                Switch1 = null,
                                DelFlag = null,
                                InstallmentsBegDate = transactionHdDto.InstallmentsBegDate,
                                UntilMonth = transactionHdDto.UntilMonth
                            };
                            var transactionDt = _mapper.Map<TransactionDt>(data);
                            await _context.TransactionDts.AddAsync(transactionDt);
                            await _context.SaveChangesAsync();
                            _context.ChangeTracker.Clear();
                            myId++;
                        }
                    }
                    await _context.SaveChangesAsync();
                    return newTransaction.Mytransid.ToString();
                }

                //var updateSwitch1 = _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "ServicesSubType"
                //&& c.Switch4 == transactionHdDto.ServiceType && c.Refid == transactionHdDto.ServiceSubType).FirstOrDefault();
                //updateSwitch1.Switch1 = maxSwitch.ToString();


                //var request = new AccountRequest() { 
                //    TenantID = newTransaction.TenentId,
                //    LocationID =(int)newTransaction.LocationId,
                //    AccountID = 121212,
                //    AccountName = "english",
                //    ArabicAccountName = "arabic",
                //    AccountTypeID = 1,
                //    UserID = 1,
                //    ActivityDateTime = DateTime.Now

                //};
                //_IFinancialTransactionService.SaveCOA(request);

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
                            ServiceSubType = t.ServiceSubType,
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

            var data = (from approvals in _context.TransactionHddapprovalDetails
                        join emp in _context.DetailedEmployees
                        on approvals.EmployeeId equals Convert.ToInt32(emp.EmployeeId)

                        join hd in _context.TransactionHds
                        on approvals.Mytransid equals hd.Mytransid
                        where approvals.Active == true
                        select new ReturnServiceApprovals
                        {
                            MyTransId = (int)hd.Mytransid,
                            EmployeeId = Convert.ToInt32(emp.EmployeeId),
                            EnglishName = emp.EnglishName,
                            ArabicName = emp.ArabicName,
                            Services = hd.ServiceId.ToString(),
                            ServiceType = hd.ServiceType,
                            ServiceSubType = hd.ServiceSubType,
                            Source = hd.Source,
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
                        existingtransactionHd.Entrydate = (DateTime)approveRejectServiceDto.Entrydate;
                        existingtransactionHd.Entrytime = (DateTime)approveRejectServiceDto.Entrytime;
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

        public async Task<IEnumerable<SelectServiceTypeDto>> GetSubServiceTypeByServiceType(int tenentId, int refId)
        {
            var result = await _context.Reftables.Where(c => c.Refsubtype == "ServicesSubType" && c.Switch4 == refId && c.TenentId == tenentId).ToListAsync();
            var data = _mapper.Map<IEnumerable<SelectServiceTypeDto>>(result);
            return data;
        }

        public async Task<ReturnApprovalDetailsDto> GetServiceApprovalsByTransIdAsync(int tenentId, int locationId, int transId)
        {
            var result = _context.TransactionHds.Where(c => c.TenentId == tenentId &&
            c.LocationId == locationId && c.Mytransid == transId).FirstOrDefault();
            var data = _mapper.Map<ReturnApprovalDetailsDto>(result);
            return data;
        }

        public long GetPeriodCode()
        {
            long periodCode = _context.Tblperiods.FromSqlRaw("select * from tblperiods where getdate() between PRD_START_DATE and PRD_END_DATE").Select(p => p.PeriodCode).FirstOrDefault();
            return periodCode;
        }


    }
}
