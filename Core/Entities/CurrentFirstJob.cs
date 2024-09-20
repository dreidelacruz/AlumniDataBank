using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class CurrentFirstJob : BaseEntity
    {
        public int Yes { get; set; }
        public int No { get; set; }
        public int Total { get; set; }
        [JsonIgnore]
        public FirstJobDetail FirstJobDetail { get; set; }
        public Guid FirstJobDetailId { get; set; }
    }
}