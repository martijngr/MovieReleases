using MovieReleases.Domain.Movies;
using MovieReleases.Domain.Users;
using MovieReleases.Domain.Watchlists;
using System.Data.Entity;

namespace MovieReleases.Domain.Uow
{
    public interface IUnitOfWork
    {
        DbSet<Movie> Movies { get; set; }

        DbSet<WatchlistItem> WatchlistItems { get; set; }

        DbSet<User> Users { get; set; }

        int SaveChanges();
    }
}
