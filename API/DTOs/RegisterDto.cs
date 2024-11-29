using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto:LoginDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}