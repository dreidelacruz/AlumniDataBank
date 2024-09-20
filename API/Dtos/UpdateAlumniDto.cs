using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class UpdateAlumniDto
    {
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string PhoneNumber { get; set; }
        public string Quote { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
    }
}