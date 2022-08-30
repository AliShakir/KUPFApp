using API.Helpers;
using API.Middleware;
using API.Models;
using API.Servivces;
using API.Servivces.Implementation;
using API.Servivces.Implementation.DetailedEmployee;
using API.Servivces.Implementation.Localization;
using API.Servivces.Interfaces;
using API.Servivces.Interfaces.DetailedEmployee;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace API
{
    public class Startup
    {
        public IConfiguration _config { get; }
        public Startup(IConfiguration config)
        {
            _config = config;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //
            services.AddScoped<ILocalizationService, LocalizationService>();
            //
            services.AddScoped<IDetailedEmployeeService, DetailedEmployeeService>();
            //
            services.AddScoped<IFunctionMstService, FunctionMstService>();
            //
            services.AddScoped<IUserMstService, UserMstService>();
            //
            services.AddScoped<IRefTableService, RefTableService>();
            //
            services.AddScoped<IFunctionUserService, FunctionUserService>();
            //
            services.AddScoped<ICrupMstServivce, CrupMstService>();
            //
            services.AddScoped<ICrupAuditService, CrupAuditService>();
            //
            services.AddScoped<ILoginService, LoginService>();
            //
            services.AddScoped<ICommonService, CommonService>();
            //
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            services.AddDbContext<KUPFDbContext>(options =>
            {
                options.UseSqlServer(_config.GetConnectionString("MsSqlConnection"));
            });
            //Enable CORS    
            //services.AddCors(c =>    
            //{    
            //    c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod()    
            //     .AllowAnyHeader());    
            //});   
            
            services.AddControllers();            
            services.AddControllersWithViews()
            .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                );
           
            services.AddSwaggerGen(c =>
            {
                //c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                   
                    Title = "KUPF API",
                    Version = "v1",
                    Description = "An API to perform KUPF operations",             
                    
                });

            });
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(options=> 
            options.WithOrigins("http://localhost:4200", "https://kupf.erp53.com")
            .AllowAnyMethod()
            .AllowAnyHeader());
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();
            app.UseMiddleware<ExceptionMiddleware>();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            if (env.IsProduction())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }
            app.UseHttpsRedirection();

            app.UseRouting();
            
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
