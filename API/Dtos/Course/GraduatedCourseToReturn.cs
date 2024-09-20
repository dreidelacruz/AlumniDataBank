using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Course
{
    public class GraduatedCourseToReturn
    {
        public Guid Id { get; set; }
        public int BSIT { get; set; }
        public int BSCS { get; set; }
        public int ACT { get; set; }
    }
}