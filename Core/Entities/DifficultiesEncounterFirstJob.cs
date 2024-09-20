using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class DifficultiesEncounterFirstJob : BaseEntity
    {
        public int NoAvailJob { get; set; }
        public int LackOfExp { get; set; }
        public int LowCompenOffer { get; set; }
        public int LowOpporAdvancement { get; set; }
        public int LackOfSkill { get; set; }
        public int Other { get; set; }
        public int Total { get; set; }
        [JsonIgnore]
        public FirstJobDetail FirstJobDetail { get; set; }
        public Guid FirstJobDetailId { get; set; }
    }
}