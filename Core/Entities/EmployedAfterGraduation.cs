using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class EmployedAfterGraduation : BaseEntity
    {
        public int Yes { get; set; }
        public int No { get; set; }
        public int Total { get; set; }
        [JsonIgnore]
        public Employee Employee { get; set; }
        public Guid EmployeeId { get; set; }
    }
}