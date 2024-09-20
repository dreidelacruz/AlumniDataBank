using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Employee : BaseEntity
    {
        public PresentlyEmployed PresentlyEmployed { get; set; }
        public CompanyType CompanyType { get; set; }
        public JobPosition JobPosition { get; set; }
        public EmploymentStatus EmploymentStatus { get; set; }
        public EmployedAfterGraduation EmployedAfterGraduation { get; set; }
        public ReasonForUnemployed ReasonForUnemployed { get; set; }
        [JsonIgnore]
        public Year Year { get; set; }
        public Guid YearId { get; set; }
    }
}