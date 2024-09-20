using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using API.Dtos.Course;
using Core.Entities;

namespace API.Dtos
{
    public class CreateYearDto
    {
        [Required]
        public string GraduatedSchoolYear { get; set; }
        [JsonIgnore]
        public Core.Entities.Course GraduatedCourse { get; set; }
    }
}