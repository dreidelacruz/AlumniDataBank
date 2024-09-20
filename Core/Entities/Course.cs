using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Course : BaseEntity
    {
        public int BSIT { get; set; }
        public int BSCS { get; set; }
        public int ACT { get; set; }
        public int Total { get; set; }
        [JsonIgnore]
        public Year Year { get; set; }
        public Guid YearId { get; set; }
    }
}