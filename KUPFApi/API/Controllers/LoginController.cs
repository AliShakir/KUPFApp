using API.Common;
using API.DTOs;
using API.Models;
using API.Servivces.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly KUPFDbContext _context;
        private readonly IFunctionUserService _functionUserService;
        public LoginController(KUPFDbContext context, IFunctionUserService functionUserService)
        {
            _context = context;
            _functionUserService = functionUserService;
        }
        [HttpPost]
        [Route("EmployeeLogin")]
        public async Task<ActionResult<IEnumerable<LoginDto>>> EmployeeLogin(LoginDto loginDto)
        {
            string decodedPass = CommonMethods.EncodePass(loginDto.password);
            var user = await _context.UserMsts.
                Where(c => c.LoginId == loginDto.username && c.Password == decodedPass)
                .ToListAsync();
            List<LoginDto> userList = new List<LoginDto>();
            if (user.Count() >= 1)
            {
                for (int i = 0; i < user.Count(); i++)
                {
                    var dto = new LoginDto
                    {
                        username = user[i].LoginId,
                        LocationId = user[i].LocationId,
                        TenantId = user[i].TenentId,
                        UserId = user[i].UserId
                    };
                    userList.Add(dto);
                }
                return userList;
            }

            return userList;
        }
        [HttpGet]
        [Route("GetUserFunctionsByUserId")]
        public async Task<ActionResult<IEnumerable<MenuHeadingDto>>> GetUserFunctionsByUserId(int id)
        {
            #region MyRegion
            //List<MenuHeadingDto> menuHeader = new List<MenuHeadingDto>();
            //var result = await _functionUserService.GetFunctionUserByUserIdAsync(id);
            //if (result.Count() > 0)
            //{
            //    var menuHeading = result.Where(c => c.MASTER_ID == 0).ToArray();

            //    for (int x = 0; x <= menuHeading.Count() - 1; x++)
            //    {
            //        menuHeader.Add(new MenuHeadingDto
            //        {
            //            HeadingNameEnglish = menuHeading[x].MENU_NAMEEnglish,
            //            HeadingNameArabic = menuHeading[x].MENU_NAMEArabic,
            //            HeadingIconPath = menuHeading[x].ICONPATH,
            //            HeadingSmallText = menuHeading[x].SMALLTEXT,
            //            HeadingFullName = menuHeading[x].FULL_NAME,
            //            HeadingLink = menuHeading[x].LINK,
            //            HeadingURLOption = menuHeading[x].Urloption,
            //            HeadingURLRewrite = menuHeading[x].URLREWRITE,
            //            HeadingMenuLocation = menuHeading[x].MENU_LOCATION,
            //            HeadingMenuOrder = menuHeading[x].MENU_ORDER,
            //            HeadingDocParent = menuHeading[x].DOC_PARENT,
            //            HeadingAddFlage = menuHeading[x].ADDFLAGE,
            //            HeadingEditFlage = menuHeading[x].EDITFLAGE,
            //            HeadingDelFlage = menuHeading[x].DELFLAGE,
            //            HeadingPrintFlage = menuHeading[x].PRINTFLAGE,
            //            HeadingAmIGlobale = menuHeading[x].AMIGLOBALE,
            //            HeadingMyPersonal = menuHeading[x].MYPERSONAL,
            //            HeadingSp1 = menuHeading[x].SP1,
            //            HeadingSp2 = menuHeading[x].SP2,
            //            HeadingSp3 = menuHeading[x].SP3,
            //            HeadingSp4 = menuHeading[x].SP4,
            //            HeadingSp5 = menuHeading[x].SP5,
            //            HeadingSpName1 = menuHeading[x].SP1Name,
            //            HeadingSpName2 = menuHeading[x].SP2Name,
            //            HeadingSpName3 = menuHeading[x].SP3Name,
            //            HeadingSpName4 = menuHeading[x].SP4Name,
            //            HeadingSpName5 = menuHeading[x].SP5Name

            //        });
            //        var menuItems = result.Where(c => c.MASTER_ID == menuHeading[x].MENU_ID).ToArray();

            //        for (int i = 0; i <= menuItems.Count() - 1; i++)
            //        {
            //            menuHeader[x].MenuItems.Add(new MenuItemsDto()
            //            {
            //                MenuItemNameEnglish = menuItems[i].MENU_NAMEEnglish,
            //                MenuItemNameArabic = menuItems[i].MENU_NAMEArabic,
            //                MenuItemIconPath = menuItems[i].ICONPATH,
            //                MenuItemSmallText = menuItems[i].SMALLTEXT,
            //                MenuItemFullName = menuItems[i].FULL_NAME,
            //                MenuItemLink = menuItems[i].LINK,
            //                MenuItemURLOption = menuItems[i].Urloption,
            //                MenuItemURLRewrite = menuItems[i].URLREWRITE,
            //                MenuItemMenuLocation = menuItems[i].MENU_LOCATION,
            //                MenuItemMenuOrder = menuItems[i].MENU_ORDER,
            //                MenuItemDocParent = menuItems[i].DOC_PARENT,
            //                MenuItemAddFlage = menuItems[i].ADDFLAGE,
            //                MenuItemEditFlage = menuItems[i].EDITFLAGE,
            //                MenuItemDelFlage = menuItems[i].DELFLAGE,
            //                MenuItemPrintFlage = menuItems[i].PRINTFLAGE,
            //                MenuItemAmIGlobale = menuItems[i].AMIGLOBALE,
            //                MenuItemMyPersonal = menuItems[i].MYPERSONAL,
            //                MenuItemSp1 = menuItems[i].SP1,
            //                MenuItemSp2 = menuItems[i].SP2,
            //                MenuItemSp3 = menuItems[i].SP3,
            //                MenuItemSp4 = menuItems[i].SP4,
            //                MenuItemSp5 = menuItems[i].SP5,
            //                MenuItemSpName1 = menuItems[i].SP1Name,
            //                MenuItemSpName2 = menuItems[i].SP2Name,
            //                MenuItemSpName3 = menuItems[i].SP3Name,
            //                MenuItemSpName4 = menuItems[i].SP4Name,
            //                MenuItemSpName5 = menuItems[i].SP5Name
            //            });
            //        }
            //    }

            //}
            //// var d = JsonConvert.SerializeObject(menuHeader);
            //return Ok(menuHeader);


            #endregion

            List<MenuHeadingDto> menuHeader = new List<MenuHeadingDto>();
            // Get menu data by UserId...
            var result = await _functionUserService.GetFunctionUserByUserIdAsync(id);
            
            if (result.Count() > 0)
            {
                // If has dashboard access...
                var dasboard = result.FirstOrDefault(o => o.MENU_ID == 1);
                if(dasboard !=null)
                {
                    menuHeader.Add(new MenuHeadingDto
                    {
                        HeadingNameEnglish = dasboard.MENU_NAMEEnglish,
                        HeadingNameArabic = dasboard.MENU_NAMEArabic,
                        HeadingIconPath = dasboard.ICONPATH,
                        HeadingSmallText = dasboard.SMALLTEXT,
                        HeadingFullName = dasboard.FULL_NAME,
                        HeadingLink = dasboard.LINK,
                        HeadingURLOption = dasboard.Urloption,
                        HeadingURLRewrite = dasboard.URLREWRITE,
                        HeadingMenuLocation = dasboard.MENU_LOCATION,
                        HeadingMenuOrder = dasboard.MENU_ORDER,
                        HeadingDocParent = dasboard.DOC_PARENT,
                        HeadingAddFlage = dasboard.ADDFLAGE,
                        HeadingEditFlage = dasboard.EDITFLAGE,
                        HeadingDelFlage = dasboard.DELFLAGE,
                        HeadingPrintFlage = dasboard.PRINTFLAGE,
                        HeadingAmIGlobale = dasboard.AMIGLOBALE,
                        HeadingMyPersonal = dasboard.MYPERSONAL,
                        HeadingSp1 = dasboard.SP1,
                        HeadingSp2 = dasboard.SP2,
                        HeadingSp3 = dasboard.SP3,
                        HeadingSp4 = dasboard.SP4,
                        HeadingSp5 = dasboard.SP5,
                        HeadingSpName1 = dasboard.SP1Name,
                        HeadingSpName2 = dasboard.SP2Name,
                        HeadingSpName3 = dasboard.SP3Name,
                        HeadingSpName4 = dasboard.SP4Name,
                        HeadingSpName5 = dasboard.SP5Name

                    });
                }
                // If employeeManagement...
                var employeeManagementHeading = result.Where(c =>c.MASTER_ID == 0).ToArray();
                if (employeeManagementHeading.Length > 0)
                {
                    for (int x = 0; x <= employeeManagementHeading.Count() - 1; x++)
                    {
                        menuHeader.Add(new MenuHeadingDto
                        {
                            HeadingNameEnglish = employeeManagementHeading[x].MENU_NAMEEnglish,
                            HeadingNameArabic = employeeManagementHeading[x].MENU_NAMEArabic,
                            HeadingMenuId = employeeManagementHeading[x].MENU_ID,
                            HeadingIconPath = employeeManagementHeading[x].ICONPATH,
                            HeadingSmallText = employeeManagementHeading[x].SMALLTEXT,
                            HeadingFullName = employeeManagementHeading[x].FULL_NAME,
                            HeadingLink = employeeManagementHeading[x].LINK,
                            HeadingURLOption = employeeManagementHeading[x].Urloption,
                            HeadingURLRewrite = employeeManagementHeading[x].URLREWRITE,
                            HeadingMenuLocation = employeeManagementHeading[x].MENU_LOCATION,
                            HeadingMenuOrder = employeeManagementHeading[x].MENU_ORDER,
                            HeadingDocParent = employeeManagementHeading[x].DOC_PARENT,
                            HeadingAddFlage = employeeManagementHeading[x].ADDFLAGE,
                            HeadingEditFlage = employeeManagementHeading[x].EDITFLAGE,
                            HeadingDelFlage = employeeManagementHeading[x].DELFLAGE,
                            HeadingPrintFlage = employeeManagementHeading[x].PRINTFLAGE,
                            HeadingAmIGlobale = employeeManagementHeading[x].AMIGLOBALE,
                            HeadingMyPersonal = employeeManagementHeading[x].MYPERSONAL,
                            HeadingSp1 = employeeManagementHeading[x].SP1,
                            HeadingSp2 = employeeManagementHeading[x].SP2,
                            HeadingSp3 = employeeManagementHeading[x].SP3,
                            HeadingSp4 = employeeManagementHeading[x].SP4,
                            HeadingSp5 = employeeManagementHeading[x].SP5,
                            HeadingSpName1 = employeeManagementHeading[x].SP1Name,
                            HeadingSpName2 = employeeManagementHeading[x].SP2Name,
                            HeadingSpName3 = employeeManagementHeading[x].SP3Name,
                            HeadingSpName4 = employeeManagementHeading[x].SP4Name,
                            HeadingSpName5 = employeeManagementHeading[x].SP5Name

                        });
                        var menuItems = result.Where(c => c.MASTER_ID == employeeManagementHeading[x].MENU_ID && c.MENU_TYPE =="9").ToArray();

                        for (int i = 0; i <= menuItems.Count() - 1; i++)
                        {
                            menuHeader[x].MenuItems.Add(new MenuItemsDto()
                            {
                                MenuItemNameEnglish = menuItems[i].MENU_NAMEEnglish,
                                MenuItemNameArabic = menuItems[i].MENU_NAMEArabic,
                                MenuItemIconPath = menuItems[i].ICONPATH,
                                MenuItemSmallText = menuItems[i].SMALLTEXT,
                                MenuItemFullName = menuItems[i].FULL_NAME,
                                MenuItemLink = menuItems[i].LINK,
                                MenuItemURLOption = menuItems[i].Urloption,
                                MenuItemURLRewrite = menuItems[i].URLREWRITE,
                                MenuItemMenuLocation = menuItems[i].MENU_LOCATION,
                                MenuItemMenuOrder = menuItems[i].MENU_ORDER,
                                MenuItemDocParent = menuItems[i].DOC_PARENT,
                                MenuItemAddFlage = menuItems[i].ADDFLAGE,
                                MenuItemEditFlage = menuItems[i].EDITFLAGE,
                                MenuItemDelFlage = menuItems[i].DELFLAGE,
                                MenuItemPrintFlage = menuItems[i].PRINTFLAGE,
                                MenuItemAmIGlobale = menuItems[i].AMIGLOBALE,
                                MenuItemMyPersonal = menuItems[i].MYPERSONAL,
                                MenuItemSp1 = menuItems[i].SP1,
                                MenuItemSp2 = menuItems[i].SP2,
                                MenuItemSp3 = menuItems[i].SP3,
                                MenuItemSp4 = menuItems[i].SP4,
                                MenuItemSp5 = menuItems[i].SP5,
                                MenuItemSpName1 = menuItems[i].SP1Name,
                                MenuItemSpName2 = menuItems[i].SP2Name,
                                MenuItemSpName3 = menuItems[i].SP3Name,
                                MenuItemSpName4 = menuItems[i].SP4Name,
                                MenuItemSpName5 = menuItems[i].SP5Name
                            });
                        }
                        // To filterout service management...
                        var serviceManagement = result.Where(c => c.MASTER_ID == employeeManagementHeading[x].MENU_ID && c.MENU_TYPE == "3").ToArray();
                        if (serviceManagement.Count() > 0)
                        {
                            for (int i = 0; i < serviceManagement.Length; i++)
                            {
                                menuHeader[x].ListMenuHeadingDto.Add(new MenuHeadingDto
                                {
                                    HeadingNameEnglish = serviceManagement[i].MENU_NAMEEnglish,
                                    HeadingNameArabic = serviceManagement[i].MENU_NAMEArabic,
                                    HeadingMenuId = serviceManagement[i].MENU_ID,
                                    HeadingIconPath = serviceManagement[i].ICONPATH,
                                    HeadingSmallText = serviceManagement[i].SMALLTEXT,
                                    HeadingFullName = serviceManagement[i].FULL_NAME,
                                    HeadingLink = serviceManagement[i].LINK,
                                    HeadingURLOption = serviceManagement[i].Urloption,
                                    HeadingURLRewrite = serviceManagement[i].URLREWRITE,
                                    HeadingMenuLocation = serviceManagement[i].MENU_LOCATION,
                                    HeadingMenuOrder = serviceManagement[i].MENU_ORDER,
                                    HeadingDocParent = serviceManagement[i].DOC_PARENT,
                                    HeadingAddFlage = serviceManagement[i].ADDFLAGE,
                                    HeadingEditFlage = serviceManagement[i].EDITFLAGE,
                                    HeadingDelFlage = serviceManagement[i].DELFLAGE,
                                    HeadingPrintFlage = serviceManagement[i].PRINTFLAGE,
                                    HeadingAmIGlobale = serviceManagement[i].AMIGLOBALE,
                                    HeadingMyPersonal = serviceManagement[i].MYPERSONAL,
                                    HeadingSp1 = serviceManagement[i].SP1,
                                    HeadingSp2 = serviceManagement[i].SP2,
                                    HeadingSp3 = serviceManagement[i].SP3,
                                    HeadingSp4 = serviceManagement[i].SP4,
                                    HeadingSp5 = serviceManagement[i].SP5,
                                    HeadingSpName1 = serviceManagement[i].SP1Name,
                                    HeadingSpName2 = serviceManagement[i].SP2Name,
                                    HeadingSpName3 = serviceManagement[i].SP3Name,
                                    HeadingSpName4 = serviceManagement[i].SP4Name,
                                    HeadingSpName5 = serviceManagement[i].SP5Name

                                });
                                var serviceMenuItem = result.Where(c => c.MASTER_ID == serviceManagement[i].MENU_ID && c.MENU_TYPE == "9").ToArray();
                                for (int b = 0; b < serviceMenuItem.Length; b++)
                                {
                                    menuHeader[x].ListMenuHeadingDto[i].MenuItems.Add(new MenuItemsDto()
                                    {
                                        MenuItemNameEnglish = serviceMenuItem[b].MENU_NAMEEnglish,
                                        MenuItemNameArabic = serviceMenuItem[b].MENU_NAMEArabic,
                                        MenuItemIconPath = serviceMenuItem[b].ICONPATH,
                                        MenuItemSmallText = serviceMenuItem[b].SMALLTEXT,
                                        MenuItemFullName = serviceMenuItem[b].FULL_NAME,
                                        MenuItemLink = serviceMenuItem[b].LINK,
                                        MenuItemURLOption = serviceMenuItem[b].Urloption,
                                        MenuItemURLRewrite = serviceMenuItem[b].URLREWRITE,
                                        MenuItemMenuLocation = serviceMenuItem[b].MENU_LOCATION,
                                        MenuItemMenuOrder = serviceMenuItem[b].MENU_ORDER,
                                        MenuItemDocParent = serviceMenuItem[b].DOC_PARENT,
                                        MenuItemAddFlage = serviceMenuItem[b].ADDFLAGE,
                                        MenuItemEditFlage = serviceMenuItem[b].EDITFLAGE,
                                        MenuItemDelFlage = serviceMenuItem[b].DELFLAGE,
                                        MenuItemPrintFlage = serviceMenuItem[b].PRINTFLAGE,
                                        MenuItemAmIGlobale = serviceMenuItem[b].AMIGLOBALE,
                                        MenuItemMyPersonal = serviceMenuItem[b].MYPERSONAL,
                                        MenuItemSp1 = serviceMenuItem[b].SP1,
                                        MenuItemSp2 = serviceMenuItem[b].SP2,
                                        MenuItemSp3 = serviceMenuItem[b].SP3,
                                        MenuItemSp4 = serviceMenuItem[b].SP4,
                                        MenuItemSp5 = serviceMenuItem[b].SP5,
                                        MenuItemSpName1 = serviceMenuItem[b].SP1Name,
                                        MenuItemSpName2 = serviceMenuItem[b].SP2Name,
                                        MenuItemSpName3 = serviceMenuItem[b].SP3Name,
                                        MenuItemSpName4 = serviceMenuItem[b].SP4Name,
                                        MenuItemSpName5 = serviceMenuItem[b].SP5Name
                                    });
                                }
                            }
                        }

                    }
                }
                
                

            }
            
            return Ok(menuHeader);
        }


    }
}
