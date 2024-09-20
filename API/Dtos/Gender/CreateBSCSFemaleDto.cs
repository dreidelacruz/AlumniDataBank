using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Gender
{
    public class CreateBSCSFemaleDto
    {
        public int BSCSFemale { get; set; }
        public Guid YearId { get; set; }
    }
}