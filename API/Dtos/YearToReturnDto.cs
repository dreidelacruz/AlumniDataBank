using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Course;
using Core.Entities;

namespace API.Dtos
{
    public class YearToReturnDto
    {
        public Guid Id { get; set; }
        public int GraduatedSchoolYear { get; set; }
        public GraduatedCourseToReturn GraduatedCourseToReturn { get; set; }
        public int Total { get; set; }
    }
}