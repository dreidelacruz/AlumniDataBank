using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class JobPosition : BaseEntity
    {
        public int Managerial { get; set; }
        public int Supervisory { get; set; }
        public int Clerical { get; set; }
        public int SelfEmployed { get; set; }
        public int Other { get; set; }
        public int Total { get; set; }
        [JsonIgnore]
        public Employee Employee { get; set; }
        public Guid EmployeeId { get; set; }
    }
}