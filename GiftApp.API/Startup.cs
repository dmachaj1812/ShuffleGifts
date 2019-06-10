using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GiftApp.API.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using GiftApp.API.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using GiftApp.API.SeedData;
using AutoMapper;
using GiftApp.API.AutoMapper;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using GiftApp.API.Helpers;
using GiftApp.API.Classes;

namespace GiftApp
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });
            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);

            var connection = @"Data Source=SQL5036.site4now.net;Initial Catalog=DB_9B0204_shuffleapp;User Id=DB_9B0204_shuffleapp_admin;Password=dawid1812;";
            services.AddCors(options => options.AddPolicy("AllowWebApp",
                builder => builder.AllowAnyMethod()
                        .WithOrigins("http://localhost:4200")
                          .AllowAnyOrigin()
                          .AllowAnyHeader()));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddDbContext<DataContext>(x => x.UseSqlServer(connection));
            services.AddTransient<SeedData>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.
                                GetBytes(Configuration.GetSection("AppSettings:JWTKEY").Value)),
                            ValidateIssuer = false,
                            ValidateAudience = false,
                        };
                    });
            services.AddScoped<IRepository, Repository>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<IGiftRepository, GiftRepository>();
            services.AddScoped<IUsersRepository, UsersRepository>();
            services.AddScoped<IGiftPickerRepository, GiftPickerRepository>();
            services.AddScoped<IEventRepository, EventRepository>();
            services.AddScoped<IGetSeededDataRepository, GetSeededDataRepository>();
            services.AddScoped<IPasswordRepository, PasswordRepository>();
            services.AddScoped<IJwtToken, JwtToken>();
            services.AddScoped<IShuffleRepository, ShuffleRepository>();
            services.AddScoped<IShuffleGiftUserRepository, ShuffleGiftUserRepository>();

        }
        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });
            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);

            var connection = @"Server = DESKTOP-5K1SNIH\SQLEXPRESS; Database = GiftApp; Trusted_Connection = true";
            services.AddCors(options => options.AddPolicy("AllowWebApp",
                builder => builder.AllowAnyMethod()
                        .WithOrigins("http://localhost:4200")
                          .AllowAnyOrigin()
                          .AllowAnyHeader()));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddDbContext<DataContext>(x => x.UseSqlServer(connection));
            services.AddTransient<SeedData>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.
                                GetBytes(Configuration.GetSection("AppSettings:JWTKEY").Value)),
                            ValidateIssuer = false,
                            ValidateAudience = false,
                        };
                    });
            services.AddScoped<IRepository, Repository>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<IGiftRepository, GiftRepository>();
            services.AddScoped<IUsersRepository, UsersRepository>();
            services.AddScoped<IGiftPickerRepository, GiftPickerRepository>();
            services.AddScoped<IEventRepository, EventRepository>();
            services.AddScoped<IGetSeededDataRepository, GetSeededDataRepository>();
            services.AddScoped<IPasswordRepository, PasswordRepository>();
            services.AddScoped<IJwtToken, JwtToken>();
            services.AddScoped<IShuffleRepository, ShuffleRepository>();
            services.AddScoped<IShuffleGiftUserRepository, ShuffleGiftUserRepository>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, SeedData seedData)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(builder =>
                {
                    builder.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null)
                        {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
                app.UseHsts();
            }


            seedData.SeedRoles();
            seedData.SeedGiftStatuses();
            seedData.SeedEventOptions();
            seedData.SeedEventTypes();

            app.UseCors("AllowWebApp");
            app.UseAuthentication();
            app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapSpaFallbackRoute(
                    name: "spa-fullback",
                    defaults: new { controller = "Fallback", action = "Index" }
                );
            });
        }
    }
}
