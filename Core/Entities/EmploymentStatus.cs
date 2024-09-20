using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class EmploymentStatus : BaseEntity
    {
        public int Regular { get; set; }
        public int Temporary { get; set; }
        public int Casual { get; set; }
        public int Contractual { get; set; }
        public int PartTime { get; set; }
        public int Probitionary { get; set; }
        public int Total { get; set; }
        [JsonIgnore]
        public Employee Employee { get; set; }
        public Guid EmployeeId { get; set; }
    }
}