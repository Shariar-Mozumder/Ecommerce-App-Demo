using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

namespace TheBApple.Infrastucture
{
    public class CustomDbContextFactory<T> : ICustomDbContextFactory<T> where T : DbContext
    {
        public IConfiguration _configuration;
        public CustomDbContextFactory(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public T CreateDbContext(string connectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<T>();
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("Cn"));
            return Activator.CreateInstance(typeof(T), optionsBuilder.Options) as T;
        }

        public T CreateDbContextArchiveDB(string connectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<T>();
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("ArchiveDBCn"));
            return Activator.CreateInstance(typeof(T), optionsBuilder.Options) as T;
        }

        public T CreateDbContextAsteriskDB(string connectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<T>();
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("AsteriskCn"));
            return Activator.CreateInstance(typeof(T), optionsBuilder.Options) as T;
        }

        public T CreateDbContextLogDBCn(string connectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<T>();
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("LogDBCn"));
            return Activator.CreateInstance(typeof(T), optionsBuilder.Options) as T;
        }

    }

    public interface ICustomDbContextFactory<out T> where T : DbContext
    {
        T CreateDbContext(string connectionString);
        T CreateDbContextArchiveDB(string connectionString);
        T CreateDbContextAsteriskDB(string connectionString);
        T CreateDbContextLogDBCn(string connectionString);

    }
}
