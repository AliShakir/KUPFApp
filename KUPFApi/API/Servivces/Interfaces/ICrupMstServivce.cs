using API.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Servivces.Interfaces
{
    public interface ICrupMstServivce
    {
        int InsertCrupMstAsync(CrupMstDto crupMstDto);
        int UpdatCrupMstAsync(CrupMstDto crupMstDto);
        int DeleteCrupMstAsync(int tenantId, int locationId, Int64 crupId);
        IEnumerable<CrupMstDto> GetCrupMstAsync(int tenantId,int locationId, Int64 crupId);
    }
}
