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

        public DbSet<BrandsModel> Brands { get; set; }
        public DbSet<ColorsModel> Colors { get; set; }
        public DbSet<CommentsModel> Comments { get; set; }
        public DbSet<ImagesModel> Images { get; set; }
        public DbSet<ProductsModel> Products { get; set; }

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
