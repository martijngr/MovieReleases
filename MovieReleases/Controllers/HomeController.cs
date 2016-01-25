using System.Web.Mvc;
using MovieReleases.Business.Users;

namespace MovieReleases.Controllers
{
    public class HomeController : Controller
    {
        private readonly UserService _userService;

        public HomeController(UserService userService)
        {
            _userService = userService;
        }

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetStartupData()
        {
            var user = _userService.GetUser(1);

            return new JsonResult
            {
                Data = new 
                {
                    userId = user.UserId,
                    username = user.Username,
                    friends = user.Friends,
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
            };
        }
    }
}