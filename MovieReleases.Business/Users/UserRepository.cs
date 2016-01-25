using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieReleases.Domain;
using MovieReleases.Domain.Uow;

namespace MovieReleases.Business.Users
{
    public class UserRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public User GetUser()
        {
            var user = _unitOfWork.Users.FirstOrDefault(u => u.Id == 1);
            return user;
        }

        public User GetUserById(int id)
        {
            var user = _unitOfWork.Users.FirstOrDefault(u => u.Id == id);
            return user;
        }
    }
}
