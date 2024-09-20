using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Gender : BaseEntity
    {
        public int Male { get; set; }
        public int Female { get; set; }
        public int Total { get; set; }
        [JsonIgnore]
        public Year Year { get; set; }
        public Guid YearId { get; set; }
    }
}