using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace MovieReleases.Business.MovieScrapers
{
    public static class JTokenExtensions
    {
        public static T GetValue<T>(this JToken token, params string[] keys)
        {
            JToken value = token;
            bool keyFound = false;

            foreach (var key in keys)
            {
                if (value[key] != null)
                {
                    value = value[key];
                    keyFound = true;
                }
            }

            if (keyFound)
            {
                var tokenValue = (string)value;
                return (T)Convert.ChangeType(tokenValue, typeof(T));
            }
            else
            {
                return default(T);
            }
        }
    }
}
