using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class TableTwoToReturnDto
    {
        public Guid Id { get; set; }
        public int GraduatedSchoolYear { get; set; }
        public int BSIT { get; set; }
        public int BSCS { get; set; }
        public int ACT { get; set; }      
        public int BSITMale { get; set; }
        public int BSCSMale { get; set; }
        public int ACTMale { get; set; }  
        public int BSITFemale { get; set; }
        public int BSCSFemale { get; set; }
        public int ACTFemale { get; set; }    
        public int MaleTotal { get; set; }
        public int FemaleTotal { get; set; }
        
    }
}