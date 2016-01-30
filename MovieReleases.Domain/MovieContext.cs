using MovieReleases.Domain.Movies;
using MovieReleases.Domain.Users;
using MovieReleases.Domain.Watchlists;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieReleases.Domain
{
    public class MovieContext : DbContext
    {

        public MovieContext() : base("MovieContext")
        {
        }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<WatchlistItem> WatchlistItems { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WatchlistItem>().ToTable("WatchlistItems");
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Movie>().ToTable("Movies");
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
