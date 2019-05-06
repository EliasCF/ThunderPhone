using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ThunderPhone.Models;

namespace ThunderPhone
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext (DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<BrandsModel> brands { get; set; }
        public DbSet<ColorsModel> colors { get; set; }
        public DbSet<CommentsModel> comments { get; set; }
        public DbSet<ImagesModel> images { get; set; }
        public DbSet<ProductsModel> products { get; set; }

        protected override void OnModelCreating (ModelBuilder builder)
        {
            builder.Entity<BrandsModel>().HasKey(m => m.Id);
            builder.Entity<ColorsModel>().HasKey(m => m.Id);
            builder.Entity<CommentsModel>().HasKey(m => m.Id);
            builder.Entity<ImagesModel>().HasKey(m => m.Id);
            builder.Entity<ProductsModel>().HasKey(m => m.Id);
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();

            return base.SaveChanges();
        }
    }
}
