using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class ReasonTakingFirstJob : BaseEntity
    {
        public int Salary { get; set; }
        public int CareerChallenge { get; set; }
        public int RelatedSpecialSkil { get; set; }
        public int ProximtyMyResidence { get; set; }
        public int Other { get; set; }
        public int Total { get; set; }
        [JsonIgnore]
        public FirstJobDetail FirstJobDetail { get; set; }
        public Guid FirstJobDetailId { get; set; }
    }
}