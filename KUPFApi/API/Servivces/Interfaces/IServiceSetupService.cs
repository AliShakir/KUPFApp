﻿using API.DTOs;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Servivces.Interfaces
{
    public interface IServiceSetupService
    {
        Task<int> AddServiceSetupAsync(ServiceSetupDto serviceSetupDto);
        Task<int> EditServiceSetupAsync(ServiceSetupDto serviceSetupDto);
        Task<int> DeleteServiceSetupAsync(int id);
        Task<ServiceSetupDto> GetServiceSetupByIdAsync(int id);
        Task<List<ServiceSetupDto>> GetServiceSetupAsync();
        Task<ReturnWebContent> GetWebContentByPageNameAsync(string pageName);

        Task<int> AddServiceSubscriptionAsync(ServiceSubscriptionDto serviceSubscriptionDto);
    }
}
