

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
        
        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     base.OnModelCreating(modelBuilder);
        //     modelBuilder.Entity<FormTitleHd>()           
        //     .HasMany(a=>a.FormTitleDts)
        //     .WithOne(x=>x.FormTitleHds)
        //     .IsRequired();
            
        // }
    }

}