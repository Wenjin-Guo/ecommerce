using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : IdentityDbContext<User, Role, int>
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasMany(u => u.Address)                  // Navigation property in User
                .WithOne(a => a.User)                       // Navigation property in UserAddress
                .HasForeignKey(a => a.UserId)               // UserAddress.UserId is the foreign key
                .OnDelete(DeleteBehavior.Cascade);          // Cascade delete when a User is deleted


            builder.Entity<Role>()
                .HasData(
                    new Role { Name = "Member", NormalizedName = "MEMBER" },
                    new Role { Name = "Admin", NormalizedName = "ADMIN" }
                );
        }
    }
}
