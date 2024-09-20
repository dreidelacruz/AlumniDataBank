using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class VerifyEmailDto
    {
        public string UserId { get; set; }
        public string Token { get; set; }
    }
}