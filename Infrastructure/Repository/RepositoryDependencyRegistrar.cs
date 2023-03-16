
using System;
using System.Collections.Generic;
using System.Text;

namespace BApple.Repository
{
    public static class RepositoryDependencyRegistrar
    {
        /// <summary>
        /// Register services and interfaces
        /// </summary>
        /// <param name="builder">Container builder</param>
        //public static void RepositoryRegister(this ContainerBuilder builder)
        //{
        //    //repositories
        //    builder.RegisterGeneric(typeof(GenericRepository<>)).As(typeof(IGenericRepository<>)).InstancePerLifetimeScope();
        //    builder.RegisterGeneric(typeof(UnitOfWork<>)).As(typeof(IUnitOfWork<>)).InstancePerLifetimeScope();
        //    builder.RegisterType<DataProvider>().As<IDataProvider>().InstancePerLifetimeScope();
        //}
    }

    public interface IDataProvider
    {
        string Get();
    }

    public class DataProvider : IDataProvider
    {
        public string Get()
        {
            return "Test data";
        }
    }
}
