using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Gender
{
    public class CreateACTFemaleDto
    {
        public int ACTFemale { get; set; }
        public Guid YearId { get; set; }
    }
}