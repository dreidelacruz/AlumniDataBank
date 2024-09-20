using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Gender
{
    public class CreateBSITMaleDto
    {
        public int BSITMale { get; set; }
        public Guid YearId { get; set; }
    }
}