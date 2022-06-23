

using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<FormTitleDt> FormTitleDT { get; set; }
        public DbSet<FormTitleHd> FormTitleHD { get; set; }
    }
}