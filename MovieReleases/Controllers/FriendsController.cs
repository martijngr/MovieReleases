using System.Web.Http;
using MovieReleases.Business.Users;
using MovieReleases.DTO;

namespace MovieReleases.Controllers
{
    public class FriendsController : ApiController
    {
        private readonly UserService _userService;

        public FriendsController(UserService userService)
        {
            _userService = userService;
        }

        public UserDetailDTO Get(int id) 
        {
            var user = _userService.GetUserInfo(id);

            return user;
        }
    }
}