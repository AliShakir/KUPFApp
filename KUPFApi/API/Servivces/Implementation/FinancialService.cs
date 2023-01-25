using API.Common;
using API.DTOs;
using API.DTOs.DropDown;
using API.DTOs.EmployeeDto;
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
using System.Net.NetworkInformation;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace API.Servivces.Implementation
{
    public class FinancialService : IFinancialService
    {
        private readonly KUPFDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFinancialTransactionService _IFinancialTransactionService;
        private readonly ICrupMstServivce _crupMstServivce;
        public FinancialService(KUPFDbContext context, IMapper mapper,
            IFinancialTransactionService IFinancialTransactionService, ICrupMstServivce crupMstServivce)
        {
            _context = context;
            _mapper = mapper;
            _IFinancialTransactionService = IFinancialTransactionService;
            _crupMstServivce = crupMstServivce;
        }
        public async Task<FinancialServiceResponse> AddFinancialServiceAsync(TransactionHdDto transactionHdDto)
        {
            if (_context != null)
            {

                FinancialServiceResponse response = new FinancialServiceResponse();
                var newTransaction = _mapper.Map<TransactionHd>(transactionHdDto);

                if (transactionHdDto.IsKUEmployee != true)
                {
                    return new FinancialServiceResponse
                    {
                        IsSuccess = false,
                        Message = "Subscription apply only to the KU Employees"
                    };
                }
                else if (transactionHdDto.IsOnSickLeave == true)
                {
                    return new FinancialServiceResponse
                    {
                        Response = "2" // A KU Employee on the Sick Leave Cannot apply for the Membership
                    };
                }
                else if (transactionHdDto.IsMemberOfFund == true)
                {
                    return new FinancialServiceResponse
                    {
                        Response = "3" // Employee is Member of a KUPF Fund Committe
                    };
                }
                else if (transactionHdDto.TerminationId != null)
                {
                    return new FinancialServiceResponse
                    {
                        Response = "4" // Employee Was Terminated Earlier
                    };
                }
                else
                {
                    #region Subscriber    
                    int myId = 1;
                    var attachId = _context.TransactionHddms.FromSqlRaw("select isnull(Max(AttachID+1),1) as attachId from  [TransactionHDDMS ] where TenentID='" + transactionHdDto.TenentId + "'").Select(p => p.AttachId).FirstOrDefault();
                    var serialNo = _context.TransactionHddms.FromSqlRaw("select isnull(Max(Serialno+1),1) as serialNo from  [TransactionHDDMS ] where tenentId='" + transactionHdDto.TenentId + "' and attachid=1").Select(c => c.Serialno).FirstOrDefault();
                    int maxSwitch1 = _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "ServicesSubType"
                       && c.Switch4 == transactionHdDto.ServiceTypeId && c.Refid == transactionHdDto.ServiceSubTypeId).Max(x => Convert.ToInt32(x.Switch1));
                    int maxSwitch = maxSwitch1 + 1;
                    
                    #region Save into TransactionHddm
                    var attachmentsData = new TransactionHddm
                    {
                        TenentId = (int)transactionHdDto.TenentId,
                        Mytransid = newTransaction.Mytransid,
                        AttachId = attachId,
                        Remarks = transactionHdDto.AttachmentRemarks,
                        Subject = transactionHdDto.Subject,
                        MetaTags = transactionHdDto.MetaTags
                    };

                    
                    //var path = "E:\\";
                    var path = @"/HostingSpaces/kupf1/kupfapi.erp53.com/New/ServiceAttachments/";

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
                    #endregion


                    #region Save Into TransactionHDDApprovalDetails
                    var serviceApprovals = _context.ServiceSetups.Where(p => p.ServiceType == 2 && p.ServiceSubType == 5).FirstOrDefault();
                    if(serviceApprovals != null)
                    {
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
                    }
                    
                    #endregion




                    if (transactionHdDto.ServiceType == "Subscriber  - مشترك")
                    {
                        var existingSubscriber = _context.TransactionHds.Where(c => c.EmployeeId == newTransaction.EmployeeId).FirstOrDefault();
                        if (existingSubscriber != null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "5" // Duplicate subscriber...
                            };
                        }

                        newTransaction.Mytransid = CommonMethods.CreateEmployeeId();
                        newTransaction.MasterServiceId = maxSwitch;
                        await _context.TransactionHds.AddAsync(newTransaction);
                        await _context.SaveChangesAsync();

                        
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


                        
                    }

                    else if (transactionHdDto.ServiceType == "Membership Withdrawal - الانسحاب من العضوية"
                        && transactionHdDto.ServiceSubType == "Termination - الفصل من العمل  ")
                    {
                        #region Membership-Withdrawls
                        // check if membership rejeced / terminated..
                        var employeeMembership = _context.DetailedEmployees.FirstOrDefault(c => c.EmployeeId == transactionHdDto.EmployeeId.ToString());
                        if (employeeMembership.TerminationId == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "6" // Not Terminated...
                            };
                        }
                        else if (employeeMembership.EndDate != null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "7" // End of date not null...
                            };
                        }
                        else
                        {
                            // To make sure Employee dont have any due Loan amount
                            var dueLoanamount = (from hd in _context.TransactionHds
                                                 join dt in _context.TransactionDts
                                                 on hd.Mytransid equals dt.Mytransid
                                                 where hd.EmployeeId == transactionHdDto.EmployeeId &&
                                                 hd.TenentId == transactionHdDto.TenentId &&
                                                 hd.LocationId == transactionHdDto.LocationId
                                                 select new
                                                 {
                                                     hd,
                                                     dt
                                                 }).Count();
                            // To make sure Employee is not sponsored for the pending Loan Amount
                            var pendingLoanAmount = (from hd in _context.TransactionHds
                                                     join dt in _context.TransactionDts
                                                     on hd.Mytransid equals dt.Mytransid
                                                     where hd.SponserProvidentID == transactionHdDto.EmployeeId &&
                                                     hd.TenentId == transactionHdDto.TenentId &&
                                                     hd.LocationId == transactionHdDto.LocationId
                                                     select new
                                                     {
                                                         hd,
                                                         dt
                                                     }).Count();
                            if (dueLoanamount != 0)
                            {
                                return new FinancialServiceResponse
                                {
                                    Response = "8" // Employee have due Loan amount
                                };
                            }
                            else if (pendingLoanAmount != 0)
                            {
                                return new FinancialServiceResponse
                                {
                                    Response = "9" // Employee is sponsored for the pending Loan Amount
                                };
                            }
                            else
                            {
                                int totalMonths = CommonMethods.CalculateMembershipDuration((DateTime)employeeMembership.SubscribedDate);
                                var discountValues = _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "Withdrawals").ToList();

                                // Next Due Date for payment...
                                DateTime nextDueDate = DateTime.Now.AddYears(1);

                                // Get termination info
                                var termination = _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "Termination").FirstOrDefault();

                                // Get employee status
                                var empStatus = _context.Reftables.Where(c => c.Refid == 9 && c.Reftype == "KUPF" && c.Refsubtype == "EmpStatus").FirstOrDefault();

                                // Get Subscription Status
                                var subscriptionStatus = _context.Reftables.Where(c => c.Refid == 1 && c.Reftype == "KUPF" && c.Refsubtype == "SubscriptionStatus").FirstOrDefault();

                                //
                                decimal payableAmount = 0M;
                                //
                                decimal payableAmountAfterOneYear = 0M;

                                for (int i = 0; i < discountValues.Count; i++)
                                {
                                    if (totalMonths >= Convert.ToInt32(discountValues[i].Switch3)
                                        && totalMonths <= discountValues[i].Switch4)
                                    {
                                        // Add record to TransactionDT
                                        newTransaction.Mytransid = CommonMethods.CreateEmployeeId();
                                        newTransaction.MasterServiceId = maxSwitch;
                                        await _context.TransactionHds.AddAsync(newTransaction);
                                        await _context.SaveChangesAsync();

                                        // To be paid today
                                        payableAmount = ((((decimal)transactionHdDto.Totamt * totalMonths) / 100) * Convert.ToInt32(discountValues[i].Switch1));

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
                                            InstallmentAmount = payableAmount,
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

                                        payableAmount = ((((decimal)transactionHdDto.Totamt * totalMonths) / 100) * Convert.ToInt32(discountValues[i].Switch2));
                                        //
                                        payableAmountAfterOneYear = payableAmount;
                                        data = new TransactionDtDto
                                        {
                                            TenentId = transactionHdDto.TenentId,
                                            LocationId = transactionHdDto.LocationId,
                                            Mytransid = newTransaction.Mytransid,
                                            Myid = myId + 1,
                                            EmployeeId = transactionHdDto.EmployeeId,
                                            InstallmentNumber = 1,//Create a method to create subscription and this should be starts from currnet month + next year....
                                            AttachId = 0,
                                            PeriodCode = GetPeriodCode(),// comes from TBLPeriods table.
                                            InstallmentAmount = payableAmount,
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
                                        transactionDt = _mapper.Map<TransactionDt>(data);
                                        await _context.TransactionDts.AddAsync(transactionDt);
                                        await _context.SaveChangesAsync();
                                        _context.ChangeTracker.Clear();

                                        //
                                        int lastDiscount = Convert.ToInt32(discountValues[i].Switch1) - Convert.ToInt32(discountValues[i].Switch2);
                                        //
                                        payableAmount = ((decimal)transactionHdDto.Totamt * totalMonths / 100 * lastDiscount);
                                        //
                                        data = new TransactionDtDto
                                        {
                                            TenentId = transactionHdDto.TenentId,
                                            LocationId = transactionHdDto.LocationId,
                                            Mytransid = newTransaction.Mytransid,
                                            Myid = myId + 2,
                                            EmployeeId = transactionHdDto.EmployeeId,
                                            InstallmentNumber = 1,//Create a method to create subscription and this should be starts from currnet month + next year....
                                            AttachId = 0,
                                            PeriodCode = GetPeriodCode(),// comes from TBLPeriods table.
                                            InstallmentAmount = payableAmount,
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
                                        transactionDt = _mapper.Map<TransactionDt>(data);
                                        await _context.TransactionDts.AddAsync(transactionDt);
                                        await _context.SaveChangesAsync();
                                        _context.ChangeTracker.Clear();

                                        // Update detailedEmployee
                                        employeeMembership.EndDate = DateTime.Now;
                                        employeeMembership.SettlementSerMonths = totalMonths;
                                        employeeMembership.NextSetlementPayAmount = payableAmountAfterOneYear;
                                        employeeMembership.NextSetlementPayDate = nextDueDate;
                                        employeeMembership.Active = false;
                                        employeeMembership.Subscription_status = empStatus.Refid;
                                        employeeMembership.EmpStatus = subscriptionStatus.Refid;
                                        employeeMembership.TerminationId = termination.Refid;
                                        employeeMembership.Termination = termination.Refsubtype;
                                        employeeMembership.TerminationDate = DateTime.Now;

                                        // Stop execution...
                                        break;

                                    }
                                }


                            }
                        }
                        #endregion
                    }
                    else if (transactionHdDto.ServiceType == "End of Service - نهاية الخدمة")
                    {
                        #region EndOfService-Retirement

                        // check if membership rejeced / terminated..
                        var employeeMembership = _context.DetailedEmployees.FirstOrDefault(c => c.EmployeeId == transactionHdDto.EmployeeId.ToString());
                        if (employeeMembership.EmpStatus == 1 ||
                            employeeMembership.EmpStatus == 9 ||
                            employeeMembership.EmpStatus == 10)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "9" // Employee Status Not valid                          
                            };
                        }
                        else if (employeeMembership.TerminationId == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "10" // TerminationId is null...                            
                            };
                        }
                        else if (employeeMembership.TerminationDate == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "11" // TerminationDate is null...                            
                            };
                        }
                        else if (employeeMembership.Termination == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "12" // Termination is null...                            
                            };
                        }
                        else if (employeeMembership.EndDate == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "13" // End date is null...                            
                            };
                        }
                        else if (employeeMembership.SubscribedDate == null || employeeMembership.ReSubscripedDate == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "14" // SubscribedDate Or ReSubscribedDate is date is null...                            
                            };
                        }
                        else if (employeeMembership.JoinedDate == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "15" // JoinedDate is null...                            
                            };
                        }
                        else
                        {
                            // To make sure Employee dont have any due Loan amount
                            var dueLoanamount = (from hd in _context.TransactionHds
                                                 join dt in _context.TransactionDts
                                                 on hd.Mytransid equals dt.Mytransid
                                                 where hd.EmployeeId == transactionHdDto.EmployeeId &&
                                                 hd.TenentId == transactionHdDto.TenentId &&
                                                 hd.LocationId == transactionHdDto.LocationId &&
                                                 hd.ServiceTypeId != 1 || hd.ServiceTypeId != 8
                                                 select new
                                                 {
                                                     hd,
                                                     dt
                                                 }).Count();
                            // To make sure Employee is not sponsored for the pending Loan Amount
                            var pendingLoanAmount = (from hd in _context.TransactionHds
                                                     join dt in _context.TransactionDts
                                                     on hd.Mytransid equals dt.Mytransid
                                                     where hd.SponserProvidentID == transactionHdDto.EmployeeId &&
                                                     hd.TenentId == transactionHdDto.TenentId &&
                                                     hd.LocationId == transactionHdDto.LocationId &&
                                                     hd.ServiceTypeId != 1 || hd.ServiceTypeId != 8
                                                     select new
                                                     {
                                                         hd,
                                                         dt
                                                     }).Count();
                            if (dueLoanamount != 0)
                            {
                                return new FinancialServiceResponse
                                {
                                    Response = "8" // Employee have due Loan amount
                                };
                            }
                            else if (pendingLoanAmount != 0)
                            {
                                return new FinancialServiceResponse
                                {
                                    Response = "9" // Employee is sponsored for the pending Loan Amount
                                };
                            }
                            else
                            {
                                int totalMonths = CommonMethods.CalculateMembershipDuration((DateTime)employeeMembership.SubscribedDate);
                                var discountValues = _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "Withdrawals").ToList();

                                // Next Due Date for payment...
                                DateTime nextDueDate = DateTime.Now.AddYears(1);

                                // Get termination info
                                var termination = _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "Termination").FirstOrDefault();

                                // Get employee status
                                var empStatus = _context.Reftables.Where(c => c.Refid == 9 && c.Reftype == "KUPF" && c.Refsubtype == "EmpStatus").FirstOrDefault();

                                // Get Subscription Status
                                var subscriptionStatus = _context.Reftables.Where(c => c.Refid == 1 && c.Reftype == "KUPF" && c.Refsubtype == "SubscriptionStatus").FirstOrDefault();

                                //
                                decimal payableAmount = 0M;
                                //
                                decimal payableAmountAfterOneYear = 0M;

                                for (int i = 0; i < discountValues.Count; i++)
                                {
                                    if (totalMonths >= Convert.ToInt32(discountValues[i].Switch3)
                                        && totalMonths <= discountValues[i].Switch4)
                                    {
                                        // Add record to TransactionDT
                                        newTransaction.Mytransid = CommonMethods.CreateEmployeeId();
                                        newTransaction.MasterServiceId = maxSwitch;
                                        await _context.TransactionHds.AddAsync(newTransaction);
                                        await _context.SaveChangesAsync();

                                        // To be paid today
                                        payableAmount = ((((decimal)transactionHdDto.Totamt * totalMonths) / 100) * Convert.ToInt32(discountValues[i].Switch1));

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
                                            InstallmentAmount = payableAmount,
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

                                        payableAmount = ((((decimal)transactionHdDto.Totamt * totalMonths) / 100) * Convert.ToInt32(discountValues[i].Switch2));
                                        //
                                        payableAmountAfterOneYear = payableAmount;

                                        data = new TransactionDtDto
                                        {
                                            TenentId = transactionHdDto.TenentId,
                                            LocationId = transactionHdDto.LocationId,
                                            Mytransid = newTransaction.Mytransid,
                                            Myid = myId + 1,
                                            EmployeeId = transactionHdDto.EmployeeId,
                                            InstallmentNumber = 1,//Create a method to create subscription and this should be starts from currnet month + next year....
                                            AttachId = 0,
                                            PeriodCode = GetPeriodCode(),// comes from TBLPeriods table.
                                            InstallmentAmount = payableAmount,
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
                                        transactionDt = _mapper.Map<TransactionDt>(data);
                                        await _context.TransactionDts.AddAsync(transactionDt);
                                        await _context.SaveChangesAsync();
                                        _context.ChangeTracker.Clear();

                                        //
                                        int lastDiscount = Convert.ToInt32(discountValues[i].Switch1) - Convert.ToInt32(discountValues[i].Switch2);
                                        //
                                        payableAmount = ((decimal)transactionHdDto.Totamt * totalMonths / 100 * lastDiscount);
                                        //
                                        data = new TransactionDtDto
                                        {
                                            TenentId = transactionHdDto.TenentId,
                                            LocationId = transactionHdDto.LocationId,
                                            Mytransid = newTransaction.Mytransid,
                                            Myid = myId + 2,
                                            EmployeeId = transactionHdDto.EmployeeId,
                                            InstallmentNumber = 1,//Create a method to create subscription and this should be starts from currnet month + next year....
                                            AttachId = 0,
                                            PeriodCode = GetPeriodCode(),// comes from TBLPeriods table.
                                            InstallmentAmount = payableAmount,
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
                                        transactionDt = _mapper.Map<TransactionDt>(data);
                                        await _context.TransactionDts.AddAsync(transactionDt);
                                        await _context.SaveChangesAsync();
                                        _context.ChangeTracker.Clear();

                                        // Update detailedEmployee
                                        employeeMembership.EndDate = DateTime.Now;
                                        employeeMembership.SettlementSerMonths = totalMonths;
                                        employeeMembership.NextSetlementPayAmount = payableAmountAfterOneYear;
                                        employeeMembership.NextSetlementPayDate = nextDueDate;
                                        employeeMembership.Active = false;
                                        employeeMembership.Subscription_status = empStatus.Refid;
                                        employeeMembership.EmpStatus = subscriptionStatus.Refid;
                                        employeeMembership.TerminationId = termination.Refid;
                                        employeeMembership.Termination = termination.Refsubtype;
                                        employeeMembership.TerminationDate = DateTime.Now;

                                        // Stop execution...
                                        break;

                                    }
                                }
                            }
                        }
                        #endregion
                    }
                    else if (transactionHdDto.ServiceType == "Financial")
                    {
                        #region Financial

                        // check if membership rejeced / terminated..
                        var employeeMembership = _context.DetailedEmployees.FirstOrDefault(c => c.EmployeeId == transactionHdDto.EmployeeId.ToString());
                        if (employeeMembership.EmpStatus == 1 ||
                            employeeMembership.EmpStatus == 9 ||
                            employeeMembership.EmpStatus == 10)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "9" // Employee Status Not valid                           
                            };
                        }
                        else if (employeeMembership.TerminationId == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "10" // TerminationId is null...                          
                            };
                        }
                        else if (employeeMembership.TerminationDate == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "11" // TerminationDate is null...                                
                            };
                        }
                        else if (employeeMembership.Termination == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "12" // Termination is null...                         
                            };
                        }
                        else if (employeeMembership.EndDate == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "13" // End date is null...                             
                            };
                        }
                        else if (employeeMembership.SubscribedDate == null && employeeMembership.ReSubscripedDate == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "14" // SubscribedDate Or ReSubscribedDate is date is null...                           
                            };
                        }
                        else if (employeeMembership.JoinedDate == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "15" // JoinedDate is null...                           
                            };
                        }
                        else
                        {
                            if (transactionHdDto.ServiceSubType == "Financial Aid - القرض المالي")
                            {
                                //// To make sure Employee dont have any due Loan amount
                                //var dueLoanamount = (from hd in _context.TransactionHds
                                //                     join dt in _context.TransactionDts
                                //                     on hd.Mytransid equals dt.Mytransid
                                //                     where hd.EmployeeId == transactionHdDto.EmployeeId &&
                                //                     hd.TenentId == transactionHdDto.TenentId &&
                                //                     hd.LocationId == transactionHdDto.LocationId &&
                                //                     hd.ServiceTypeId != 1 || hd.ServiceTypeId != 8
                                //                     select new
                                //                     {
                                //                         hd,
                                //                         dt
                                //                     }).Count();
                                //// To make sure Employee is not sponsored for the pending Loan Amount
                                //var pendingLoanAmount = (from hd in _context.TransactionHds
                                //                         join dt in _context.TransactionDts
                                //                         on hd.Mytransid equals dt.Mytransid
                                //                         where hd.SponserProvidentID == transactionHdDto.EmployeeId &&
                                //                         hd.TenentId == transactionHdDto.TenentId &&
                                //                         hd.LocationId == transactionHdDto.LocationId &&
                                //                         hd.ServiceTypeId != 1 || hd.ServiceTypeId != 8
                                //                         select new
                                //                         {
                                //                             hd,
                                //                             dt
                                //                         }).Count();
                                //if (dueLoanamount != 0)
                                //{
                                //    return new FinancialServiceResponse
                                //    {
                                //        Response = "16" // Error...                            
                                //    };
                                //}
                                //else if (pendingLoanAmount != 0)
                                //{
                                //    return new FinancialServiceResponse
                                //    {
                                //        Response = "17" // Error...                            
                                //    };
                                //}
                                //else
                                //{
                                int totalMonths = CommonMethods.CalculateMembershipDuration((DateTime)employeeMembership.SubscribedDate);
                                var discountValues = _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "FinancialAid").ToList();

                                // Next Due Date for payment...
                                DateTime nextDueDate = DateTime.Now.AddYears(1);

                                // Get termination info
                                var termination = _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "Termination").FirstOrDefault();

                                // Get employee status
                                var empStatus = _context.Reftables.Where(c => c.Refid == 9 && c.Reftype == "KUPF" && c.Refsubtype == "EmpStatus").FirstOrDefault();

                                // Get Subscription Status
                                var subscriptionStatus = _context.Reftables.Where(c => c.Refid == 1 && c.Reftype == "KUPF" && c.Refsubtype == "SubscriptionStatus").FirstOrDefault();

                                for (int i = 0; i < discountValues.Count; i++)
                                {
                                    if (totalMonths > Convert.ToInt32(discountValues[i].Switch1)
                                        && totalMonths <= Convert.ToInt32(discountValues[i].Switch2))
                                    {
                                        // Add record to TransactionHD
                                        newTransaction.Mytransid = CommonMethods.CreateEmployeeId();
                                        newTransaction.MasterServiceId = maxSwitch;
                                        await _context.TransactionHds.AddAsync(newTransaction);
                                        await _context.SaveChangesAsync();

                                        // Add record to TransactionDT
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
                                            InstallmentAmount = Convert.ToDecimal(discountValues[i].Switch4),
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
                                        // Update detailedEmployee
                                        employeeMembership.EndDate = DateTime.Now;
                                        employeeMembership.SettlementSerMonths = totalMonths;
                                        employeeMembership.NextSetlementPayAmount = 0;
                                        employeeMembership.NextSetlementPayDate = nextDueDate;
                                        employeeMembership.Active = false;
                                        employeeMembership.Subscription_status = empStatus.Refid;
                                        employeeMembership.EmpStatus = subscriptionStatus.Refid;
                                        employeeMembership.TerminationId = termination.Refid;
                                        employeeMembership.Termination = termination.Refsubtype;
                                        employeeMembership.TerminationDate = DateTime.Now;
                                        break;
                                    }

                                    //}

                                }
                            }
                        }
                        #endregion
                    }
                    else if (transactionHdDto.ServiceTypeId == 22)
                    {
                        #region Financial Loan
                        // check if membership rejeced / terminated..
                        var employeeMembership = _context.DetailedEmployees.FirstOrDefault(c => c.EmployeeId == transactionHdDto.EmployeeId.ToString());
                        if (employeeMembership.EmpStatus == 1 ||
                            employeeMembership.EmpStatus == 9 ||
                            employeeMembership.EmpStatus == 10)
                        {
                            return new FinancialServiceResponse
                            {
                                IsSuccess = false,
                                Message = "Employee Status Not valid"
                            };
                        }
                        else if (employeeMembership.TerminationId == null)
                        {
                            return new FinancialServiceResponse
                            {
                                IsSuccess = false,
                                Message = "TerminationId is null"
                            };
                        }
                        else if (employeeMembership.TerminationDate == null)
                        {
                            return new FinancialServiceResponse
                            {
                                IsSuccess = false,
                                Message = "Termination Date is null"
                            };
                        }
                        else if (employeeMembership.Termination == null)
                        {
                            return new FinancialServiceResponse
                            {
                                IsSuccess = false,
                                Message = "Termination is null"
                            };
                        }
                        else if (employeeMembership.EndDate == null)
                        {
                            return new FinancialServiceResponse
                            {
                                IsSuccess = false,
                                Message = "End date is null"
                            };
                        }
                        else if (employeeMembership.SubscribedDate == null && employeeMembership.ReSubscripedDate == null)
                        {
                            return new FinancialServiceResponse
                            {
                                IsSuccess = false,
                                Message = "SubscribedDate Or ReSubscribedDate is date is null"
                            };
                        }
                        else if (employeeMembership.JoinedDate == null)
                        {
                            return new FinancialServiceResponse
                            {
                                IsSuccess = false,
                                Message = "JoinedDate is null"
                            };
                        }
                        else
                        {
                            #region Hajj-Loan 
                            if (transactionHdDto.ServiceSubTypeId == 5)
                            {
                                // To make sure Employee dont have any due Loan amount
                                var dueLoanamount = (from hd in _context.TransactionHds
                                                     join dt in _context.TransactionDts
                                                     on hd.Mytransid equals dt.Mytransid
                                                     where hd.EmployeeId == transactionHdDto.EmployeeId &&
                                                     hd.TenentId == transactionHdDto.TenentId &&
                                                     hd.LocationId == transactionHdDto.LocationId &&
                                                     hd.ServiceTypeId != 1 || hd.ServiceTypeId != 8
                                                     select new
                                                     {
                                                         hd,
                                                         dt
                                                     }).Count();
                                // To make sure Employee is not sponsored for the pending Loan Amount
                                var pendingLoanAmount = (from hd in _context.TransactionHds
                                                         join dt in _context.TransactionDts
                                                         on hd.Mytransid equals dt.Mytransid
                                                         where hd.SponserProvidentID == transactionHdDto.EmployeeId &&
                                                         hd.TenentId == transactionHdDto.TenentId &&
                                                         hd.LocationId == transactionHdDto.LocationId &&
                                                         hd.ServiceTypeId != 1 || hd.ServiceTypeId != 8
                                                         select new
                                                         {
                                                             hd,
                                                             dt
                                                         }).Count();
                                if (dueLoanamount != 0)
                                {
                                    return new FinancialServiceResponse
                                    {
                                        IsSuccess = false,
                                        Message = "Employee have due Loan amount"
                                    };
                                }
                                else if (pendingLoanAmount != 0)
                                {
                                    return new FinancialServiceResponse
                                    {
                                        IsSuccess = false,
                                        Message = "Employee is sponsored for the pending Loan Amount"
                                    };
                                }
                                else
                                {
                                    //
                                    int totalMonths = CommonMethods.CalculateMembershipDuration((DateTime)employeeMembership.JoinedDate);
                                    if (totalMonths < 6)
                                    {
                                        return new FinancialServiceResponse
                                        {
                                            IsSuccess = false,
                                            Message = "Minimum 6 months"
                                        };
                                    }
                                    //
                                    //var discountValues = _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "FinancialAid").ToList();

                                    // Next Due Date for payment...
                                    DateTime nextDueDate = DateTime.Now.AddYears(1);

                                    // Get termination info
                                    var termination = _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "Termination").FirstOrDefault();

                                    // Get employee status
                                    var empStatus = _context.Reftables.Where(c => c.Refid == 9 && c.Reftype == "KUPF" && c.Refsubtype == "EmpStatus").FirstOrDefault();

                                    // Get Subscription Status
                                    var subscriptionStatus = _context.Reftables.Where(c => c.Refid == 1 && c.Reftype == "KUPF" && c.Refsubtype == "SubscriptionStatus").FirstOrDefault();

                                    // Add record to TransactionHD
                                    newTransaction.Mytransid = CommonMethods.CreateEmployeeId();
                                    newTransaction.MasterServiceId = maxSwitch;
                                    await _context.TransactionHds.AddAsync(newTransaction);
                                    await _context.SaveChangesAsync();
                                    myId = 1;
                                    for (int i = 0; i < transactionHdDto.Totinstallments; i++)
                                    {
                                        // Add record to TransactionDT
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
                                            InstallmentAmount = newTransaction.InstallmentAmount,
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
                                    // Update detailedEmployee
                                    employeeMembership.EndDate = DateTime.Now;
                                    employeeMembership.SettlementSerMonths = totalMonths;
                                    employeeMembership.NextSetlementPayAmount = 0;
                                    employeeMembership.NextSetlementPayDate = nextDueDate;
                                    employeeMembership.Active = false;
                                    employeeMembership.Subscription_status = empStatus.Refid;
                                    employeeMembership.EmpStatus = subscriptionStatus.Refid;
                                    employeeMembership.TerminationId = termination.Refid;
                                    employeeMembership.Termination = termination.Refsubtype;
                                    employeeMembership.TerminationDate = DateTime.Now;
                                    _context.DetailedEmployees.Update(employeeMembership);
                                    await _context.SaveChangesAsync();
                                }
                            }
                            #endregion

                        }
                        #endregion
                    }
                    else if (transactionHdDto.ServiceType == "Membership Cessation - وقف العضوية ")
                    {
                        #region Membership Cessation
                        // check if membership rejeced / terminated..
                        var employeeMembership = _context.DetailedEmployees.FirstOrDefault(c => c.EmployeeId == transactionHdDto.EmployeeId.ToString());
                        if (employeeMembership.EmpStatus == 1 ||
                            employeeMembership.EmpStatus == 9 ||
                            employeeMembership.EmpStatus == 10)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "9", // Employee Status Not valid
                                IsSuccess = false,
                                Message = "Employee Status Not valid"
                            };
                        }
                        else if (employeeMembership.TerminationId == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "10" // TerminationId is null...                          
                            };
                        }
                        else if (employeeMembership.TerminationDate == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "11" // TerminationDate is null...                                
                            };
                        }
                        else if (employeeMembership.Termination == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "12" // Termination is null...                         
                            };
                        }
                        else if (employeeMembership.EndDate == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "13" // End date is null...                             
                            };
                        }
                        else if (employeeMembership.SubscribedDate == null && employeeMembership.ReSubscripedDate == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "14" // SubscribedDate Or ReSubscribedDate is date is null...                           
                            };
                        }
                        else if (employeeMembership.JoinedDate == null)
                        {
                            return new FinancialServiceResponse
                            {
                                Response = "15" // JoinedDate is null...                           
                            };
                        }
                        else
                        {

                            // To make sure Employee dont have any due Loan amount
                            var dueLoanamount = (from hd in _context.TransactionHds
                                                 join dt in _context.TransactionDts
                                                 on hd.Mytransid equals dt.Mytransid
                                                 where hd.EmployeeId == transactionHdDto.EmployeeId &&
                                                 hd.TenentId == transactionHdDto.TenentId &&
                                                 hd.LocationId == transactionHdDto.LocationId &&
                                                 hd.ServiceTypeId != 1 || hd.ServiceTypeId != 8
                                                 select new
                                                 {
                                                     hd,
                                                     dt
                                                 }).Count();
                            // To make sure Employee is not sponsored for the pending Loan Amount
                            var pendingLoanAmount = (from hd in _context.TransactionHds
                                                     join dt in _context.TransactionDts
                                                     on hd.Mytransid equals dt.Mytransid
                                                     where hd.SponserProvidentID == transactionHdDto.EmployeeId &&
                                                     hd.TenentId == transactionHdDto.TenentId &&
                                                     hd.LocationId == transactionHdDto.LocationId &&
                                                     hd.ServiceTypeId != 1 || hd.ServiceTypeId != 8
                                                     select new
                                                     {
                                                         hd,
                                                         dt
                                                     }).Count();
                            if (dueLoanamount != 0)
                            {
                                return new FinancialServiceResponse
                                {
                                    Response = "8" // Employee have due Loan amount
                                };
                            }
                            else if (pendingLoanAmount != 0)
                            {
                                return new FinancialServiceResponse
                                {
                                    Response = "9" // Employee is sponsored for the pending Loan Amount
                                };
                            }
                            else
                            {
                                //
                                int totalMonths = CommonMethods.CalculateMembershipDuration((DateTime)employeeMembership.SubscribedDate);
                                var discountValues = _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "FinancialAid").ToList();

                                // Next Due Date for payment...
                                DateTime nextDueDate = DateTime.Now.AddYears(1);

                                // Get termination info
                                var termination = _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "Termination").FirstOrDefault();

                                // Get employee status
                                var empStatus = _context.Reftables.Where(c => c.Refid == 9 && c.Reftype == "KUPF" && c.Refsubtype == "EmpStatus").FirstOrDefault();

                                // Get Subscription Status
                                var subscriptionStatus = _context.Reftables.Where(c => c.Refid == 1 && c.Reftype == "KUPF" && c.Refsubtype == "SubscriptionStatus").FirstOrDefault();

                                for (int i = 0; i < discountValues.Count; i++)
                                {
                                    if (totalMonths > Convert.ToInt32(discountValues[i].Switch1)
                                        && totalMonths <= Convert.ToInt32(discountValues[i].Switch2))
                                    {
                                        // Add record to TransactionHD
                                        newTransaction.Mytransid = CommonMethods.CreateEmployeeId();
                                        newTransaction.MasterServiceId = maxSwitch;
                                        await _context.TransactionHds.AddAsync(newTransaction);
                                        await _context.SaveChangesAsync();

                                        // Add record to TransactionDT
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
                                            InstallmentAmount = Convert.ToDecimal(discountValues[i].Switch4),
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
                                        // Update detailedEmployee
                                        employeeMembership.EndDate = DateTime.Now;
                                        employeeMembership.SettlementSerMonths = totalMonths;
                                        employeeMembership.NextSetlementPayAmount = 0;
                                        employeeMembership.NextSetlementPayDate = nextDueDate;
                                        employeeMembership.Active = false;
                                        employeeMembership.Subscription_status = empStatus.Refid;
                                        employeeMembership.EmpStatus = subscriptionStatus.Refid;
                                        employeeMembership.TerminationId = termination.Refid;
                                        employeeMembership.Termination = termination.Refsubtype;
                                        employeeMembership.TerminationDate = DateTime.Now;
                                        break;
                                    }

                                }

                            }

                        }
                        #endregion
                    }
                    #endregion
                    var updateSwitch1 = _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "ServicesSubType"
                    && c.Switch4 == transactionHdDto.ServiceTypeId && c.Refid == transactionHdDto.ServiceSubTypeId).FirstOrDefault();
                    updateSwitch1.Switch1 = maxSwitch.ToString();
                    await _context.SaveChangesAsync();
                    return new FinancialServiceResponse
                    {
                        Response = newTransaction.Mytransid.ToString(),
                        AttachId = attachId.ToString(),
                        TransactionId = newTransaction.Mytransid.ToString(),
                        IsSuccess = true,
                        Message = "Saved Successfully..."
                    };
                }


                //var updateSwitch1 = _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "ServicesSubType"
                //&& c.Switch4 == transactionHdDto.ServiceTypeId && c.Refid == transactionHdDto.ServiceSubTypeId).FirstOrDefault();
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
            return new FinancialServiceResponse
            {
                IsSuccess = true,
                Message = "Saved Successfully..."
            };

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

            var data = (from employee in _context.DetailedEmployees
                        join approvals in _context.TransactionHddapprovalDetails
                        on employee.EmployeeId equals approvals.EmployeeId.ToString()

                        join hd in _context.TransactionHds
                        on approvals.Mytransid equals hd.Mytransid
                        where approvals.Active == true
                        select new ReturnServiceApprovals
                        {
                            MyTransId = (int)hd.Mytransid,
                            EmployeeId = Convert.ToInt32(employee.EmployeeId),
                            EnglishName = employee.EnglishName,
                            ArabicName = employee.ArabicName,
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
                // To get record by transId and Active...
                var existingtransactionHd = _context.TransactionHddapprovalDetails
                    .Where(c => c.Mytransid == approveRejectServiceDto.Mytransid && c.Active == true).FirstOrDefault();

                // TO CHECK IF CRUP_ID IS NULL DETAILEDEMPLOYEE.
                var detailedEmployee = _context.DetailedEmployees.Where(c => c.EmployeeId == existingtransactionHd.EmployeeId.ToString()).FirstOrDefault();
                var crupId = _context.CrupMsts.Max(c => c.CrupId);
                var maxCrupId = crupId + 1;
                if (detailedEmployee.CRUP_ID == null)
                {

                    detailedEmployee.CRUP_ID = maxCrupId;
                    _context.DetailedEmployees.Update(detailedEmployee);
                    await _context.SaveChangesAsync();
                }
                // Add to Crup Mst
                var crupMst = new CrupMstDto
                {
                    TenantId = approveRejectServiceDto.TenantId,
                    LocationId = approveRejectServiceDto.LocationId,
                    CrupId = maxCrupId,
                    Physicallocid = "1",
                    MenuId = 0,
                    ActivityNote = $"{detailedEmployee.EmployeeId} - {detailedEmployee.EnglishName} - {detailedEmployee.Pfid}",
                    CreatedBy = approveRejectServiceDto.UserId.ToString(),
                    CreatedDt = DateTime.Now,
                    UpdatedBy = approveRejectServiceDto.UserId.ToString(),
                    UpdatedDt = DateTime.Now
                };
                _crupMstServivce.InsertCrupMst(crupMst);
                //
                var auditInfo = _context.Reftables.FirstOrDefault(c => c.Reftype == "audit" && c.Refsubtype == "Employee");
                var crupAudit = new Crupaudit
                {
                    TenantId = approveRejectServiceDto.TenantId,
                    LocationId = approveRejectServiceDto.LocationId,
                    CrupId = maxCrupId,
                    AuditNo = auditInfo.Refid,
                    AuditType = auditInfo.Shortname,
                    TableName = "DetailedEmployee",
                    FieldName = $"{detailedEmployee.EmployeeId} - {detailedEmployee.EnglishName} - {detailedEmployee.Pfid}",
                    OldValue = "Rejected",
                    NewValue = "Rejected",
                    UpdateDate = DateTime.Now,
                    UpdateUserName = "username",
                    CreatedDate = DateTime.Now,
                    CreatedUserName = "createdUser"
                };
                await _context.Crupaudits.AddAsync(crupAudit);
                await _context.SaveChangesAsync();
                if (existingtransactionHd != null)
                {
                    existingtransactionHd.Mytransid = approveRejectServiceDto.Mytransid;
                    existingtransactionHd.Userid = approveRejectServiceDto.Userid;
                    existingtransactionHd.ApprovalDate = approveRejectServiceDto.ApprovalDate;
                    existingtransactionHd.Entrydate = approveRejectServiceDto.Entrydate;
                    existingtransactionHd.Entrytime = approveRejectServiceDto.Entrytime;
                    existingtransactionHd.Status = "Rejected";
                    existingtransactionHd.RejectionRemarks = approveRejectServiceDto.RejectionRemarks;
                    existingtransactionHd.RejectionType = (int)approveRejectServiceDto.RejectionType;
                    existingtransactionHd.Active = false;
                    _context.TransactionHddapprovalDetails.Update(existingtransactionHd);
                    await _context.SaveChangesAsync();

                    // To activate new row with the same information
                    int serApprId = existingtransactionHd.SerApprovalId + 1;
                    var changeAppDetailsStatus = _context.TransactionHddapprovalDetails
                                .Where(c => c.Mytransid == approveRejectServiceDto.Mytransid && c.Active == false
                                && c.SerApprovalId == serApprId).FirstOrDefault();
                    if (changeAppDetailsStatus != null)
                    {
                        changeAppDetailsStatus.Active = true;
                        _context.TransactionHddapprovalDetails.Update(changeAppDetailsStatus);
                        await _context.SaveChangesAsync();
                    }
                    // To update TransactionHds and change active = false and status = rejected...
                    var changeTransactionHDStatus = _context.TransactionHds
                                .Where(c => c.Mytransid == existingtransactionHd.Mytransid).FirstOrDefault();
                    if (changeTransactionHDStatus != null)
                    {
                        changeTransactionHDStatus.Active = false;
                        changeTransactionHDStatus.Status = "Rejected";
                        _context.TransactionHds.Update(changeTransactionHDStatus);
                        await _context.SaveChangesAsync();
                    }
                    // To update TransactionDt and change active = false...
                    var changeTransactionDt = _context.TransactionDts
                                .Where(c => c.Mytransid == existingtransactionHd.Mytransid).ToList();
                    if (changeTransactionDt.Count > 0)
                    {
                        foreach (var row in changeTransactionDt)
                        {
                            row.Active = false;
                            _context.TransactionDts.Update(row);
                            await _context.SaveChangesAsync();
                        }
                    }

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
            var result = await _context.Reftables.Where(c => c.Reftype == "KUPF" && c.Refsubtype == "ServiceType").ToListAsync();
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

        public async Task<ReturnSearchResultDto> SearchEmployee(SearchEmployeeDto searchEmployeeDto)
        {
            if ((string.IsNullOrWhiteSpace(searchEmployeeDto.EmployeeId)
                && string.IsNullOrWhiteSpace(searchEmployeeDto.PFId)
                && string.IsNullOrWhiteSpace(searchEmployeeDto.CID)))
            {
                throw new Exception("Invalid Input");
            }

            var employee = new Models.DetailedEmployee();
            List<TransactionDt> transactions = new List<TransactionDt>();

            if (searchEmployeeDto.EmployeeId != string.Empty || !string.IsNullOrWhiteSpace(searchEmployeeDto.EmployeeId))
            {
                employee = await _context.DetailedEmployees.Where(c => c.EmployeeId == searchEmployeeDto.EmployeeId).FirstOrDefaultAsync();
                transactions = _context.TransactionDts.Where(p => p.TenentId == employee.TenentId && p.LocationId == employee.LocationId && p.EmployeeId == Convert.ToInt32(employee.EmployeeId)).ToList();
            }
            else if (searchEmployeeDto.PFId != string.Empty || !string.IsNullOrWhiteSpace(searchEmployeeDto.PFId))
            {
                employee = await _context.DetailedEmployees.Where(c => c.Pfid == searchEmployeeDto.PFId).FirstOrDefaultAsync();
                transactions = _context.TransactionDts.Where(p => p.TenentId == employee.TenentId && p.LocationId == employee.LocationId && p.EmployeeId == Convert.ToInt32(employee.EmployeeId)).ToList();
            }
            else if (searchEmployeeDto.CID != string.Empty || !string.IsNullOrWhiteSpace(searchEmployeeDto.CID))
            {
                employee = await _context.DetailedEmployees.Where(c => c.EmpCidNum == searchEmployeeDto.CID).FirstOrDefaultAsync();
                transactions = _context.TransactionDts.Where(p => p.TenentId == employee.TenentId && p.LocationId == employee.LocationId && p.EmployeeId == Convert.ToInt32(employee.EmployeeId)).ToList();
            }
            //
            var country = await _context.TblCountries.Where(c => c.TenentId == employee.TenentId && c.Countryid == employee.NationCode).FirstOrDefaultAsync();
            //
            var contractType = await _context.Reftables.Where(c => c.TenentId == employee.TenentId && c.Refid == Convert.ToInt32(employee.ContractType) && c.Refsubtype == "ContractType").FirstOrDefaultAsync();

            var data = new ReturnSearchResultDto()
            {
                TenentId = employee.TenentId,
                LocationId = employee.LocationId,
                EmployeeId = employee.EmployeeId,
                Pfid = employee.Pfid,
                EmpCidNum = employee.EmpCidNum,
                EnglishName = employee.EnglishName,
                ArabicName = employee.ArabicName,
                EmpGender = employee.EmpGender,
                JoinedDate = employee.JoinedDate,
                MobileNumber = employee.MobileNumber,
                EmpMaritalStatus = employee.EmpMaritalStatus,
                ContractType = contractType.Refname3,
                Next2KinName = employee.Next2KinName,
                Next2KinMobNumber = employee.Next2KinMobNumber,
                EndDate = employee.EndDate,
                EmployeeStatus = employee.EmpStatus.ToString(),
                SubscriptionAmount = transactions.Sum(c => (decimal)c.InstallmentAmount),
                SubscriptionPaid = transactions.Sum(c => (decimal)c.ReceivedAmount),
                LastSubscriptionPaid = transactions.Sum(c => (decimal)c.PendingAmount),
                SubscriptionDueAmount = transactions.Sum(c => (decimal)c.PendingAmount),
                IsKUEmployee = employee.IsKUEmployee,
                IsMemberOfFund = employee.IsMemberOfFund,
                IsOnSickLeave = employee.IsOnSickLeave,
                CountryId = country.Countryid,
                CountryNameArabic = country.Couname2,
                CountryNameEnglish = country.Couname1
            };
            return data;
        }
    }
}
