using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Ojt : BaseEntity
    {
        public int Score1 { get; set; }
        public int Score2 { get; set; }
        public int Score3 { get; set; }
        public int Score4 { get; set; }
        public int Score5 { get; set; }
        [JsonIgnore]
        public EducationalDetail EducationalDetail { get; set; }
        public Guid EducationalDetailId { get; set; }
    }
}