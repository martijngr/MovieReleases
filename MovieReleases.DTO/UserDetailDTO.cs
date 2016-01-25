using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieReleases.DTO
{
    public class UserDetailDTO : UserDTO
    {
        public IEnumerable<MovieDto> Movies { get; set; }
    }
}
