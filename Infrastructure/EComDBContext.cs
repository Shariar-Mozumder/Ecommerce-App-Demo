using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Domain;

namespace Infrastructure
{
    public class EComDBContext : DbContext
    {
        public EComDBContext()
        {

        }

        public EComDBContext(DbContextOptions<EComDBContext> options) : base(options)
        {

        }

        #region DbSet
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Image> Image { get; set; }

        #endregion

        public virtual void Detach<TEntity>(TEntity entity) where TEntity : class
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            var entityEntry = this.Entry(entity);
            if (entityEntry == null)
                return;

            //set the entity is not being tracked by the context
            entityEntry.State = EntityState.Detached;
        }
    }
}
