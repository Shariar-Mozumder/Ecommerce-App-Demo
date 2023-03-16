using Application.Manager;
using Application.Service;
using Ecommerce.Controllers;
using Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var configuration = builder.Configuration;


        // Add services to the container.






        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "MyEcom", Version = "v1" });
        });

        var origins = configuration["origins"].Split(';').ToArray();
        builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",
            builder =>
            {
                builder.AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithOrigins(origins);
            }));
        builder.Services.AddDbContext<EComDBContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("EcommerceDBCon"));
        });

        //Depencency Injection
        builder.Services.AddScoped<IProductService, ProductService>();
        builder.Services.AddScoped<IProductManager, ProductManager>();
        builder.Services.AddScoped<IUserManager, UserManager>();
        builder.Services.AddScoped<IUserService, UserService>();

        // Add your custom controller here
        //builder.Services.AddControllersWithViews(options =>
        //{
        //    options.Controller<ProductController>();
        //});

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();
        app.UseCors("CorsPolicy");
        //app.UseEndpoints(endpoints => { endpoints.MapControllers(); });


        app.MapControllers();

        app.Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
           Host.CreateDefaultBuilder(args)
               .ConfigureWebHostDefaults(webBuilder =>
               {
                   webBuilder.UseStartup<ProductController>();
               });
}