//[assembly: WebActivator.PostApplicationStartMethod(typeof(MovieReleases.App_Start.SimpleInjectorInitializer), "Initialize")]

namespace MovieReleases.App_Start
{
    using System.Reflection;
    using System.Web.Http;
    using System.Web.Mvc;
    using MovieReleases.IoC;
    using SimpleInjector;
    using SimpleInjector.Extensions;
    using SimpleInjector.Integration.Web;
    using SimpleInjector.Integration.Web.Mvc;
    using SimpleInjector.Integration.WebApi;

    public static class SimpleInjectorInitializer
    {
        /// <summary>Initialize the container and register it as MVC3 Dependency Resolver.</summary>
        public static void Initialize()
        {
            // Did you know the container can diagnose your configuration? Go to: https://bit.ly/YE8OJj.
            var container = new Container();
            
            InitializeContainer(container);

            // container.RegisterMvcControllers(Assembly.GetExecutingAssembly());
            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);
            
            container.Verify();

            HttpConfiguration config = new HttpConfiguration
            {
                DependencyResolver = new SimpleInjectorWebApiDependencyResolver(container)
            };

            WebApiConfig.Register(config);

            //DependencyResolver.SetResolver(new SimpleInjectorWebApiDependencyResolver(container));
        }

        private static void InitializeContainer(Container container)
        {
            IoCRegistration.Register(container);
        }
    }
}