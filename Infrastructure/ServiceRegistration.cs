using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<EComDBContext>(options =>
             options.UseSqlServer(configuration.GetConnectionString("EcommerceDBCon"), providerOptions => providerOptions.EnableRetryOnFailure()));


        }
    }
}
